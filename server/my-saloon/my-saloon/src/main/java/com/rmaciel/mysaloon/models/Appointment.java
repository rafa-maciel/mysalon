package com.rmaciel.mysaloon.models;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table (name = "appointments")
public class Appointment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(referencedColumnName = "id", name = "customer_id")
    @NotNull
    private Customer customer;

    @ManyToOne(optional = false)
    @JoinColumn(referencedColumnName = "id", name = "professional_id")
    @NotNull
    private Professional professional;

    @NotNull
    private LocalDate date;

    @NotNull
    private LocalTime time;

    private String title;
    private String notes;
    private boolean done = false;

    @OneToOne(mappedBy = "appointment", cascade = { CascadeType.MERGE, CascadeType.REMOVE })
    private Service service;

    public Appointment() {
    }

    public Appointment(Customer customer, Professional professional, LocalDate date, LocalTime time, String notes,
            String title, boolean done) {
        this.customer = customer;
        this.professional = professional;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.title = title;
        this.done = done;
    }

    public Long getId() {
        return this.id;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public Professional getProfessional() {
        return professional;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public LocalTime getTime() {
        return this.time;
    }

    public String getNotes() {
        return this.notes;
    }

    public Service getService() {
        return this.service;
    }

    public String getTitle() {
        return title;
    }

    public boolean isDone() {
        return done;
    }

	public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    public void setProfessional(Professional professional) {
        this.professional = professional;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public void setTime(LocalTime time) {
       this.time = time;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public void setService(Service service) {
        this.service = service;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDone(boolean done) {
        this.done = done;
    }


    
    
}