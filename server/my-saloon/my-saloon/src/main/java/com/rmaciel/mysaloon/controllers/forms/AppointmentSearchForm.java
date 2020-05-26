package com.rmaciel.mysaloon.controllers.forms;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.rmaciel.mysaloon.models.Appointment;
import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.repositories.specifications.AppointmentSpecification;
import com.rmaciel.mysaloon.repositories.specifications.SearchCriteria;
import com.rmaciel.mysaloon.repositories.specifications.SearchOperation;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

public class AppointmentSearchForm {
    private String customerName;
    private Long professionalId;
    
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd")
    private LocalDate date;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd")
    private LocalDate dateMax;
    private SearchOperation dateOperation;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm")
    private LocalTime time;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm")
    private LocalTime timeMax;
    private SearchOperation timeOperation;

    private BigDecimal paymentValue;
    private BigDecimal paymentValueMax;
    private SearchOperation paymentValueOperation;

    private PaymentMethod paymentMethod;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd")
    private LocalDate paymentDate;
    private LocalDate paymentDateMax;
    private SearchOperation paymentDateOperation;
    private String title;
    private Boolean done;

    public AppointmentSearchForm(String title, Boolean done, String customerName, Long professionalId, LocalDate date,
            LocalDate dateMax, SearchOperation dateOperation, LocalTime time, LocalTime timeMax,
            SearchOperation timeOperation, BigDecimal paymentValue, BigDecimal paymentValueMax,
            SearchOperation paymentValueOperation, PaymentMethod paymentMethod, LocalDate paymentDate,
            LocalDate paymentDateMax, SearchOperation paymentDateOperation) {
        this.title = title;
        this.done = done;
        this.customerName = customerName;
        this.professionalId = professionalId;
        this.date = date;
        this.dateMax = dateMax;
        this.dateOperation = dateOperation != null ? dateOperation : SearchOperation.EQUAL;
        this.time = time;
        this.timeMax = timeMax;
        this.timeOperation = timeOperation != null ? timeOperation : SearchOperation.EQUAL;
        this.paymentValue = paymentValue;
        this.paymentValueMax = paymentValueMax;
        this.paymentValueOperation = paymentValueOperation != null ? paymentValueOperation : SearchOperation.EQUAL;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
        this.paymentDateMax = paymentDateMax;
        this.paymentDateOperation = paymentDateOperation != null ? paymentDateOperation : SearchOperation.EQUAL;
    }

    public Specification<Appointment> buildSpecification() {
        return AppointmentSpecification.getByCustomerName(new SearchCriteria<String>(customerName))
            .and(AppointmentSpecification.getByTitle(new SearchCriteria<String>(title)))
            .and(AppointmentSpecification.getByDoneStatus(new SearchCriteria<Boolean>(done)))
            .and(AppointmentSpecification.getByProfessional(new SearchCriteria<Long>(professionalId)))
            .and(AppointmentSpecification.getByDate(new SearchCriteria<LocalDate>(dateOperation, date, dateMax)))
            .and(AppointmentSpecification.getByTime(new SearchCriteria<LocalTime>(timeOperation, time, timeMax)))
            .and(AppointmentSpecification.getByPaymentValue(new SearchCriteria<BigDecimal>(paymentValueOperation, paymentValue, paymentValueMax)))
            .and(AppointmentSpecification.getByPaymentMethod(new SearchCriteria<PaymentMethod>(paymentMethod)))
            .and(AppointmentSpecification.getByPaymentDate(new SearchCriteria<LocalDate>(paymentDateOperation, paymentDate, paymentDateMax)));
    }


    public String getTitle() {
        return title;
    }

    public boolean isDone() {
        return this.done;
    }

    public String getCustomerName() {
        return this.customerName;
    }

    public Long getProfessionalId() {
        return this.professionalId;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public LocalDate getDateMax() {
        return this.dateMax;
    }

    public SearchOperation getDateOperation() {
        return this.dateOperation;
    }

    public LocalTime getTime() {
        return this.time;
    }

    public LocalTime getTimeMax() {
        return this.timeMax;
    }

    public SearchOperation getTimeOperation() {
        return this.timeOperation;
    }

    public BigDecimal getPaymentValue() {
        return this.paymentValue;
    }

    public BigDecimal getPaymentValueMax() {
        return this.paymentValueMax;
    }

    public SearchOperation getPaymentValueOperation() {
        return this.paymentValueOperation;
    }

    public PaymentMethod getPaymentMethod() {
        return this.paymentMethod;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public LocalDate getPaymentDateMax() {
        return paymentDateMax;
    }

    public SearchOperation getPaymentDateOperation() {
        return this.paymentDateOperation;
    }    
}