package com.rmaciel.mysaloon.controllers.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.rmaciel.mysaloon.models.Payment;
import com.rmaciel.mysaloon.models.PaymentMethod;

public class PaymentDTO {
    private Long id;
    private BigDecimal value;
    private PaymentMethod method;
    private LocalDate date;
    private String notes;

    public PaymentDTO(Payment payment) {
        this.id = payment.getId();
        this.value = payment.getValue();
        this.method = payment.getMethod();
        this.date = payment.getDate();
        this.notes = payment.getNotes();
    }

    public Long getId() {
        return this.id;
    }

    public BigDecimal getValue() {
        return this.value;
    }

    public PaymentMethod getMethod() {
        return this.method;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getNotes() {
        return this.notes;
    }

}