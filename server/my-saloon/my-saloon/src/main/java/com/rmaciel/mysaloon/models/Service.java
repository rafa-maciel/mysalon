package com.rmaciel.mysaloon.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name = "services")
public class Service {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(orphanRemoval = true, cascade = CascadeType.PERSIST)
    @JoinColumn(referencedColumnName = "id", name = "appointment_id")
    private Appointment appointment;

    private String notes;

    @OneToOne(mappedBy = "service")
    private Payment payment;

    public Service(){}

    public Service(Appointment appointment, String notes) {
        this.appointment = appointment;
        this.notes = notes;
    }


    public Long getId() {
        return this.id;
    }

    public Appointment getAppointment() {
        return this.appointment;
    }

    public String getNotes() {
        return this.notes;
    }

    public Payment getPayment() {
        return this.payment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }



    
}