package com.rmaciel.mysaloon.models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "purchases")
public class Purchase {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private BigDecimal value;

    @Temporal(TemporalType.DATE)
    private Date date;

    @NotNull @NotEmpty
    private String notes;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @ManyToOne(optional = false)
    private Vendor vendor;


    public Purchase() {
    }


    public Purchase(BigDecimal value, Date date, String notes, PaymentMethod paymentMethod, Vendor vendor) {
        this.value = value;
        this.date = date;
        this.notes = notes;
        this.paymentMethod = paymentMethod;
        this.vendor = vendor;
    }


    public Long getId() {
        return this.id;
    }

    public BigDecimal getValue() {
        return this.value;
    }

    public String getNotes() {
        return this.notes;
    }

    public PaymentMethod getPaymentMethod() {
        return this.paymentMethod;
    }

    public Vendor getVendor() {
        return this.vendor;
    }
    public Date getDate() {
        return date;
    }

	public void setValue(BigDecimal value) {
        this.value = value;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    
}