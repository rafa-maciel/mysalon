package com.rmaciel.mysaloon.controllers.forms;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.rmaciel.mysaloon.models.Appointment;
import com.rmaciel.mysaloon.models.Customer;
import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Professional;
import com.rmaciel.mysaloon.repositories.CustomerRepository;
import com.rmaciel.mysaloon.repositories.PaymentRepository;
import com.rmaciel.mysaloon.repositories.ProfessionalRepository;
import com.rmaciel.mysaloon.repositories.ServiceRepository;

import org.springframework.format.annotation.DateTimeFormat;

public class AppointmentUpdateForm {
    private Long customerId;
    private Long professionalId;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd")
    private LocalDate date;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm")
    private LocalTime time;

    private String notes;
	private ServiceForm serviceForm;
    private String title;
    private boolean done;

    public AppointmentUpdateForm(Long customerId, Long professionalId, LocalDate date, LocalTime time, String notes,
            String title, boolean done, Long serviceId, String serviceNotes, BigDecimal paymentValue,
            PaymentMethod paymentMethod, LocalDate paymentDate, String paymentNotes) {
        this.customerId = customerId;
        this.professionalId = professionalId;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.title = title;
        this.done = done;
        this.serviceForm = new ServiceForm(serviceNotes, 
            new PaymentForm(paymentValue, paymentMethod, paymentDate, paymentNotes));
    }

    public void updateTo(Appointment appointment, CustomerRepository customerRepository,
            ProfessionalRepository professionalRepository, 
            ServiceRepository serviceRepository, PaymentRepository paymentRepository) {
        Customer customer = customerRepository.findById(this.customerId).get();
        Professional professional = professionalRepository.findById(this.professionalId).get();
        
        appointment.setCustomer(customer);
        appointment.setProfessional(professional);
        appointment.setDate(date);

        appointment.setTime(time);
        appointment.setNotes(notes);
        appointment.setTitle(title);
        appointment.setDone(done);

        serviceForm.createOrUpdate(appointment, serviceRepository, paymentRepository);
    }
    
    public Long getCustomerId() {
        return this.customerId;
    }

    public Long getProfessionalId() {
        return this.professionalId;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getTime() {
        return time;
    }

    public String getNotes() {
        return this.notes;
    }

    public String getServiceNotes() {
        return this.serviceForm.getNotes();
    }

    public String getTitle() {
        return title;
    }

    public boolean isDone() {
        return done;
    }
    
}