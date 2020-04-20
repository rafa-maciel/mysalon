package com.rmaciel.mysaloon.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "vendors")
public class Vendor {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty @NotNull @Length(min = 3, max = 40)
    private String name;

    @NotEmpty @NotNull @Length(max = 16)
    private String phone;

    @Length(max = 16)
    private String secondaryPhone;
    private String notes;

    public Vendor() {}

    public Vendor(String name, String phone, String secondaryPhone, String notes) {
        this.name = name;
        this.phone = phone;
        this.secondaryPhone = secondaryPhone;
        this.notes = notes;
    }    

    public Long getId() {
        return id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSecondaryPhone() {
        return this.secondaryPhone;
    }

    public void setSecondaryPhone(String secondaryPhone) {
        this.secondaryPhone = secondaryPhone;
    }

    public String getNotes() {
        return this.notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }


}