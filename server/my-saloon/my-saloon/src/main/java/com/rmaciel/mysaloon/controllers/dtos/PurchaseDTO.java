package com.rmaciel.mysaloon.controllers.dtos;

import java.math.BigDecimal;
import java.util.Calendar;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Purchase;

public class PurchaseDTO {
    private Long id;
    private BigDecimal value;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Calendar date;
    private String notes;
    private PaymentMethod paymentMethod;
    private String vendorName;


    public PurchaseDTO(Purchase purchase){
        this.id = purchase.getId();
        this.value = purchase.getValue();
        this.notes = purchase.getNotes();
        this.date = purchase.getDate();
        this.paymentMethod = purchase.getPaymentMethod();
        this.vendorName = purchase.getVendor().getName();
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getValue() {
        return this.value;
    }
    
    public Calendar getDate() {
        return date;
    }

    public String getNotes() {
        return this.notes;
    }

    public PaymentMethod getPaymentMethod() {
        return this.paymentMethod;
    }

    public String getVendorName() {
        return this.vendorName;
    }

    
}