package com.rmaciel.mysaloon.controllers.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.rmaciel.mysaloon.controllers.forms.TransactionForm;

public class TransactionDTO {
    private String code;
    private LocalDate date;
    private LocalTime time;
    private BigDecimal value;
    private BigDecimal fee;
    private BigDecimal netValue;

    public TransactionDTO(TransactionForm form) {
        this.code = form.getCode();
        this.date = form.getDate();
        this.time = form.getTime();
        this.value = form.getValue();
        this.fee = form.getFee();
        this.netValue = form.getNetValue();
    }


    public String getCode() {
        return this.code;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public LocalTime getTime() {
        return this.time;
    }

    public BigDecimal getValue() {
        return this.value;
    }

    public BigDecimal getFee() {
        return this.fee;
    }

    public BigDecimal getNetValue() {
        return this.netValue;
    }

    
}