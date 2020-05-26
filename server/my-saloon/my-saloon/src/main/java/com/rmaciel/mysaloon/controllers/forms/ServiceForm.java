package com.rmaciel.mysaloon.controllers.forms;

import com.rmaciel.mysaloon.models.Appointment;
import com.rmaciel.mysaloon.models.Service;
import com.rmaciel.mysaloon.repositories.PaymentRepository;
import com.rmaciel.mysaloon.repositories.ServiceRepository;

public class ServiceForm {
    private String notes;
    private PaymentForm paymentForm;

    public ServiceForm(String notes, PaymentForm paymentForm) {
        this.notes = notes;
        this.paymentForm = paymentForm;
    }

    public void createOrUpdate(Appointment appointment, ServiceRepository repository, 
            PaymentRepository paymentRepository) {
        Service service = appointment.getService();
        if (service == null) {
            service = new Service(appointment, notes);
            repository.save(service);
            appointment.setService(service);
        } else {
            service.setNotes(notes);
        }

        paymentForm.createOrUpdate(service, paymentRepository);
    }

    public String getNotes() {
        return notes;
    }

}