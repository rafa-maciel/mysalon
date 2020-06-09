package com.rmaciel.mysaloon.controllers.forms;

import java.time.LocalDate;
import java.time.LocalTime;

import com.rmaciel.mysaloon.models.Appointment;
import com.rmaciel.mysaloon.models.Customer;
import com.rmaciel.mysaloon.models.Professional;
import com.rmaciel.mysaloon.repositories.CustomerRepository;
import com.rmaciel.mysaloon.repositories.ProfessionalRepository;

import org.springframework.format.annotation.DateTimeFormat;

public class AppointmentForm {
    private Long customerId;
    private Long professionalId;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd")
    private LocalDate date;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm")
    private LocalTime time;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm")
    private LocalTime endTime;

    private String notes;
    private String title;
    private boolean done;

    public AppointmentForm(Long customerId, Long professionalId, LocalDate date, LocalTime time, LocalTime endTime,
            String notes, String title, boolean done) {
        this.customerId = customerId;
        this.professionalId = professionalId;
        this.date = date;
        this.time = time;
        this.endTime = endTime;
        this.notes = notes;
        this.title = title;
        this.done = done;
    }

    public Appointment convert(CustomerRepository customerRepository, 
            ProfessionalRepository professionalRepository) {
        Customer customer = customerRepository.findById(this.customerId).get();
        Professional professional = professionalRepository.findById(this.professionalId).get();
        
        return new Appointment(customer, professional, date, time, endTime, notes, title, done);
    }

    public void updateTo(Appointment appointment, CustomerRepository customerRepository,
            ProfessionalRepository professionalRepository) {
        Customer customer = customerRepository.findById(this.customerId).get();
        Professional professional = professionalRepository.findById(this.professionalId).get();
        
        appointment.setCustomer(customer);
        appointment.setProfessional(professional);
        appointment.setDate(date);

        appointment.setTime(time);
        appointment.setEndTime(endTime);
        appointment.setNotes(notes);
        appointment.setTitle(title);
        appointment.setDone(done);
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

    public LocalTime getEndTime() {
        return endTime;
    }

    public String getNotes() {
        return this.notes;
    }

    public String getTitle() {
        return title;
    }

    public boolean isDone() {
        return done;
    }
    
}