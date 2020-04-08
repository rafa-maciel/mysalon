package com.rmaciel.mysaloon.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "professionals")
public class Professional {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Department department;
    private String residencialPhone;
    private String cellphone;

    public Professional() {
    }
 
    public Professional(String name, Department department, String residencialPhone, String cellphone) {
        this.name = name;
        this.department = department;
        this.residencialPhone = residencialPhone;
        this.cellphone = cellphone;
    }
    
    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        this.department = department;
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
       
    
}