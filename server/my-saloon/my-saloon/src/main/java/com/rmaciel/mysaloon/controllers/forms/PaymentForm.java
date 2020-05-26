package com.rmaciel.mysaloon.controllers.forms;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.rmaciel.mysaloon.models.Payment;
import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Service;
import com.rmaciel.mysaloon.repositories.PaymentRepository;
import org.springframework.format.annotation.DateTimeFormat;

public class PaymentForm {

    private BigDecimal value;
    private PaymentMethod method;
    
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String notes;

    public PaymentForm(BigDecimal value, PaymentMethod method, LocalDate date, String notes) {
        this.value = value;
        this.method = method;
        this.date = date;
        this.notes = notes;
    }

    public void createOrUpdate(Service service, PaymentRepository repository){
        Payment payment = service.getPayment() != null 
            ? service.getPayment() 
            : new Payment(service);

        payment.setValue(value);;
        payment.setMethod(method);
        payment.setDate(date);
        payment.setNotes(notes);

        if (payment.getId() == null) {
            repository.save(payment);
            service.setPayment(payment);
        }
    }
    
}