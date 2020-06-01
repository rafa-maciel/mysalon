package com.rmaciel.mysaloon.controllers.forms;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Purchase;
import com.rmaciel.mysaloon.models.Vendor;
import com.rmaciel.mysaloon.repositories.VendorRepository;

public class PurchaseForm {
    @NotNull
    private BigDecimal value;

    @NotNull @NotEmpty
    private String notes;

    @NotNull
    private LocalDate date;

    @NotNull
    private PaymentMethod paymentMethod;
    
    @NotNull
    private Long vendorId;


    public PurchaseForm(BigDecimal value, LocalDate date, String notes, PaymentMethod paymentMethod, Long vendorId) {
        this.value = value;
        this.date = date;
        this.notes = notes;
        this.paymentMethod = paymentMethod;
        this.vendorId = vendorId;
    }

    public Purchase convertTo(VendorRepository vendorRepository) {
        Optional<Vendor> vendorOptional = vendorRepository.findById(this.vendorId);
        if (!vendorOptional.isPresent()) return null;

        return new Purchase(this.value, this.date, this.notes, this.paymentMethod, vendorOptional.get());
    }

    public void update(Purchase purchase, VendorRepository vendorRepository) {
        Vendor vendor = vendorRepository.findById(this.vendorId).get();
        purchase.setValue(this.value);
        purchase.setDate(this.date);
        purchase.setNotes(this.notes);
        purchase.setPaymentMethod(this.paymentMethod);
        purchase.setVendor(vendor);
    }


    public BigDecimal getValue() {
        return this.value;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getNotes() {
        return this.notes;
    }

    public PaymentMethod getPaymentMethod() {
        return this.paymentMethod;
    }

    public Long getVendorId() {
        return this.vendorId;
    }


}