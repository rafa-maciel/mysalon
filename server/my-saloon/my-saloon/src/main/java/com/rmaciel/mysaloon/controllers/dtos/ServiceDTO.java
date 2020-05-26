package com.rmaciel.mysaloon.controllers.dtos;

import com.rmaciel.mysaloon.models.Service;

public class ServiceDTO {
    private Long id;
    private String notes;
    private PaymentDTO payment;

    public ServiceDTO(Service service) {
        this.id = service.getId();
        this.notes = service.getNotes();
        this.payment = service.getPayment() != null ? new PaymentDTO(service.getPayment()) : null;
    }


    public Long getId() {
        return this.id;
    }

    public String getNotes() {
        return this.notes;
    }

    public PaymentDTO getPayment() {
        return this.payment;
    }

}