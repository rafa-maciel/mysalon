package com.rmaciel.mysaloon.controllers.dtos;

import java.math.BigDecimal;
import java.util.Date;

import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Purchase;

public class PurchaseDTO {
    private Long id;
    private BigDecimal value;
    private Date date;
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
    
    public Date getDate() {
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