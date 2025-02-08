package com.sadman.financial.entity;

import com.sadman.financial.enums.LoanStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class Loan extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private Double paidAmount;
    private Double remainingAmount;
    private LocalDate dueDate;
    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contract> contracts;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}

