package com.sadman.financial.responses;

import com.sadman.financial.entity.Loan;
import com.sadman.financial.enums.LoanStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class LoanResponse {

    private Long id;
    private Double amount;
    private Double paidAmount;
    private Double remainingAmount;
    private LocalDate dueDate;
    private LoanStatus status;
    private Long userId;

    // Mapping method from entity to response DTO
    public static LoanResponse select(Loan loan) {
        LoanResponse response = new LoanResponse();
        response.setId(loan.getId());
        response.setAmount(loan.getAmount());
        response.setPaidAmount(loan.getPaidAmount());
        response.setRemainingAmount(loan.getRemainingAmount());
        response.setDueDate(loan.getDueDate());
        response.setStatus(loan.getStatus());
        response.setUserId(loan.getUser().getId());

        return response;
    }
}
