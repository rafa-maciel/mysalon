package com.rmaciel.mysaloon.controllers.forms;

import java.math.BigDecimal;
import java.util.Calendar;

import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Purchase;
import com.rmaciel.mysaloon.repositories.specifications.SearchOperation;
import com.rmaciel.mysaloon.repositories.specifications.PurchaseSpecification;
import com.rmaciel.mysaloon.repositories.specifications.SearchCriteria;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

public class PurchaseSearchForm {
    private BigDecimal value;
    private BigDecimal valueMax;
    private SearchOperation valueOperation;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd")
    private Calendar date;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd")
    private Calendar dateMax;
    private SearchOperation dateOperation;

    private PaymentMethod paymentMethod;

    private Long vendorId;

    public PurchaseSearchForm(BigDecimal value, BigDecimal valueMax, SearchOperation valueOperation, Calendar date,
        Calendar dateMax, SearchOperation dateOperation, PaymentMethod paymentMethod, Long vendorId) {
        this.value = value;
        this.valueMax = valueMax;
        this.valueOperation = valueOperation;
        this.date = date;
        this.dateMax = dateMax;
        this.dateOperation = dateOperation;
        this.paymentMethod = paymentMethod;
        this.vendorId = vendorId;
    }

    public Specification<Purchase> buildSpecification() {
        return PurchaseSpecification.getByValue(new SearchCriteria<BigDecimal>(valueOperation, value, valueMax))
            .and(PurchaseSpecification.getByDate(new SearchCriteria<Calendar>(dateOperation, date, dateMax)))
            .and(PurchaseSpecification.getByPaymentMethod(new SearchCriteria<PaymentMethod>(paymentMethod)))
            .and(PurchaseSpecification.getByVendor(new SearchCriteria<Long>(vendorId)));

    }


    public BigDecimal getValue() {
        return this.value;
    }

    public SearchOperation getValueOperation() {
        return this.valueOperation;
    }

    public Calendar getDate() {
        return this.date;
    }

    public SearchOperation getDateOperation() {
        return this.dateOperation;
    }

    public PaymentMethod getPaymentMethod() {
        return this.paymentMethod;
    }

    public BigDecimal getValueMax() {
        return this.valueMax;
    }

    public Calendar getDateMax() {
        return this.dateMax;
    }

    public Long getVendorId() {
        return this.vendorId;
    }
    

    
}