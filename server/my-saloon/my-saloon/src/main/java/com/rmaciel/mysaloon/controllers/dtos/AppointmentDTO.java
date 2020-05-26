package com.rmaciel.mysaloon.controllers.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.rmaciel.mysaloon.models.Appointment;

public class AppointmentDTO {
    private Long id;
    private CustomerDTO customer;
    private ProfessionalDTO professional;
    private LocalDate date;
    private LocalTime time;
    private String notes;
    private String title;
    private boolean done;

    public AppointmentDTO(Appointment appointment) {
        this.id = appointment.getId();
        this.customer = new CustomerDTO(appointment.getCustomer());
        this.professional = new ProfessionalDTO(appointment.getProfessional());
        this.date = appointment.getDate();
        this.time = appointment.getTime();
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