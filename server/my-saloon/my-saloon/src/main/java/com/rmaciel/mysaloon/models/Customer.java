package com.rmaciel.mysaloon.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "customers")
public class Customer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull @Length(min = 3, max = 50) @NotEmpty
    private String fullname;

    @Length(max = 16)
    private String residencialPhone;

    @Length(max = 16)
    private String cellphone;

    @Length(max = 50)
    private String indicatedBy;

    @ManyToOne
    private Professional professionalEngaged;


    public Customer() {
    }


    public Customer(String fullname, String residencialPhone, String cellphone, String indicatedBy, Professional professionalEngaged) {
        this.fullname = fullname;
        this.residencialPhone = residencialPhone;
        this.cellphone = cellphone;
        this.indicatedBy = indicatedBy;
        this.professionalEngaged = professionalEngaged;
    }
    

    public Long getId() {
        return this.id;
    }

    public String getFullname() {
        return this.fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getResidencialPhone() {
        return this.residencialPhone;
    }

    public void setResidencialPhone(String residencialPhone) {
        this.residencialPhone = residencialPhone;
    }

    public String getCellphone() {
        return this.cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getIndicatedBy() {
        return this.indicatedBy;
    }

    public void setIndicatedBy(String indicatedBy) {
        this.indicatedBy = indicatedBy;
    }

    public Professional getProfessionalEngaged() {
        return this.professionalEngaged;
    }

    public void setProfessionalEngaged(Professional professionalEngaged) {
        this.professionalEngaged = professionalEngaged;
    }


}