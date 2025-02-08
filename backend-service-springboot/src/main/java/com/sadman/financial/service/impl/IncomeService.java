package com.sadman.financial.service.impl;

import com.sadman.financial.dto.IncomeRequest;
import com.sadman.financial.entity.Income;
import com.sadman.financial.entity.User;
import com.sadman.financial.exceptions.CustomMessageException;
import com.sadman.financial.repository.IncomeRepository;
import com.sadman.financial.repository.UserRepository;
import com.sadman.financial.responses.IncomeResponse;
import com.sadman.financial.security.UserPrincipal;
import com.sadman.financial.service.interfaces.IIncomeService;
import com.sadman.financial.utils.ServiceHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class IncomeService implements IIncomeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ContractService contractService;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Income logIncome(IncomeRequest incomeRequest) {
        // Retrieving the user from the SecurityContext (JWT)
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userPrincipal.getId();

        // Retrieving the User entity from the database
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomMessageException("User not found with id: " + userId));

        // Validating the income amount (should be positive)
        if (incomeRequest.getAmount() <= 0) {
            throw new CustomMessageException("Income amount must be greater than zero.");
        }

        // Creating the income entity
        Income income = new Income();
        income.setAmount(incomeRequest.getAmount());
        income.setSource(incomeRequest.getSource());
        income.setCategory(incomeRequest.getCategory());
        income.setDate(incomeRequest.getDate());
        income.setUser(user);

        // Saving the income entity
        incomeRepository.save(income);

        // Updating the user's balance (add the income amount)
        user.setBalance(user.getBalance() + incomeRequest.getAmount());
        userRepository.save(user);

        // Creating a contract for the income (contract enforcement logic)
        contractService.createContractForIncome(income, user);


        notificationService.sendNotification(userId, "Income", income.getSource() + " - " + income.getAmount());

        // Returning the created income
        return income;
    }


    @Override
    public IncomeResponse getIncomeById(Long incomeId) {
        Income income = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new CustomMessageException("Income not found " + incomeId));

        return IncomeResponse.select(income);
    }


    @Override
    public Map<String, Object> search(Integer page, Integer size, String sortBy, String search) {


        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userPrincipal.getId();


        ServiceHelper<Income> serviceHelper = new ServiceHelper<>(Income.class);
        return serviceHelper.getList(
                incomeRepository.search(search, userId, serviceHelper.getPageable(sortBy, page, size)),
                page, size);
    }


    @Override
    public IncomeResponse updateIncome(Long incomeId, IncomeRequest incomeRequest) {
        // Retrieving the existing income by its ID
        Income existingIncome = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new CustomMessageException("Income not found"));

        // Retrieving the user associated with this income
        User user = existingIncome.getUser();

        // Calculating the difference between the old and new income amount
        Double amountDifference = incomeRequest.getAmount() - existingIncome.getAmount();

        // Updating the fields of the income entity with the new values
        existingIncome.setAmount(incomeRequest.getAmount());
        existingIncome.setSource(incomeRequest.getSource());
        existingIncome.setCategory(incomeRequest.getCategory());
        existingIncome.setDate(incomeRequest.getDate());

        // Saving the updated income back to the database
        incomeRepository.save(existingIncome);

        // Adjusting the user's balance based on the amount difference
        user.setBalance(user.getBalance() + amountDifference);
        userRepository.save(user);

        // Returning the updated income as a response
        return IncomeResponse.select(existingIncome);
    }


    @Override
    public void deleteIncomeById(Long incomeId) {
        // Retrieving the existing income by its ID
        Income existingIncome = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new CustomMessageException("Income not found"));

        // Retrieving the user associated with this income
        User user = existingIncome.getUser();

        // Adjusting the user's balance by subtracting the income amount (since we are deleting it)
        user.setBalance(user.getBalance() - existingIncome.getAmount());

        // Saving the updated user balance
        userRepository.save(user);

        // Deleting the income record from the database
        incomeRepository.delete(existingIncome);
    }

}
