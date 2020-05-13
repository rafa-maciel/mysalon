package com.rmaciel.mysaloon.controllers.forms;

import java.math.BigDecimal;
import java.util.Date;

import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Purchase;
import com.rmaciel.mysaloon.repositories.specifications.SearchOperation;
import com.rmaciel.mysaloon.repositories.specifications.PurchaseSpecificationBuilder;

import org.springframework.data.jpa.domain.Specification;

public class PurchaseSearchForm {
    private BigDecimal value;
    private SearchOperation valueOperation;
    private Date date;
    private SearchOperation dateOperation;
    private PaymentMethod paymentMethod;

    public PurchaseSearchForm(BigDecimal value, SearchOperation valueOperation, Date date,
            SearchOperation dateOperation, PaymentMethod paymentMethod) {
        this.value = value;
        this.valueOperation = valueOperation;
        this.date = date;
        this.dateOperation = dateOperation;
        this.paymentMethod = paymentMethod;
    }

    public Specification<Purchase> buildSpecification() {
        PurchaseSpecificationBuilder builder = new PurchaseSpecificationBuilder();

        if (value != null) {
            valueOperation = valueOperation != null ? valueOperation : SearchOperation.EQUAL;
            builder.with("value", valueOperation, value);
        }

        if (date != null) {
            dateOperation = dateOperation != null ? dateOperation : SearchOperation.EQUAL;
            builder.with("date", dateOperation, date);
        }

        if (paymentMethod != null) {
            builder.with("paymentMethod", SearchOperation.EQUAL, paymentMethod);
        }

        return builder.build();
    }


    public BigDecimal getValue() {
        return this.value;
    }

    public SearchOperation getValueOperation() {
        return this.valueOperation;
    }

    public Date getDate() {
        return this.date;
    }

    public SearchOperation getDateOperation() {
        return this.dateOperation;
    }

    public PaymentMethod getPaymentMethod() {
        return this.paymentMethod;
    }

    
}