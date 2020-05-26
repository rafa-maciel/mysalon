package com.rmaciel.mysaloon.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "payments")
public class Payment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(referencedColumnName = "id", name = "service_id")
    @NotNull
    private Service service;

    private BigDecimal value;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;

    private LocalDate date;

    private String notes;

    public Payment(){}

    public Payment(Service service, BigDecimal value, PaymentMethod method, LocalDate date, String notes) {
        this.service = service;
        this.value = value;
        this.method = method;
        this.date = date;
        this.notes = notes;
    }

    public Payment(Service service) {
        this.service = service;
    }


    public Long getId() {
        return this.id;
    }

    public Service getService() {
        return this.service;
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

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public void setMethod(PaymentMethod method) {
        this.method = method;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }   
}