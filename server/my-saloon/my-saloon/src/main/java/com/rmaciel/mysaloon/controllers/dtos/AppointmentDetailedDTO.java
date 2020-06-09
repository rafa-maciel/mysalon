package com.rmaciel.mysaloon.controllers.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.rmaciel.mysaloon.models.Appointment;

import org.springframework.format.annotation.DateTimeFormat;

public class AppointmentDetailedDTO {
    private Long id;
    private CustomerDTO customer;
    private ProfessionalDTO professional;
    private LocalDate date;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm")
    private LocalTime time;
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm")
    private LocalTime endTime;
    private ServiceDTO service;
    private String notes;
    private String title;
    private boolean done;

    public AppointmentDetailedDTO(Appointment appointment) {
        this.id = appointment.getId();
        this.customer = new CustomerDTO(appointment.getCustomer());
        this.professional = new ProfessionalDTO(appointment.getProfessional());
        this.date = appointment.getDate();
        this.time = appointment.getTime();
        this.endTime = appointment.getEndTime();
        this.service = appointment.getService() != null ? new ServiceDTO(appointment.getService()) : null;
        this.notes = appointment.getNotes();
        this.title = appointment.getTitle();
        this.done = appointment.isDone();
    }


    public Long getId() {
        return this.id;
    }

    public CustomerDTO getCustomer() {
        return this.customer;
    }

    public ProfessionalDTO getProfessional() {
        return this.professional;
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

    public ServiceDTO getService() {
        return this.service;
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