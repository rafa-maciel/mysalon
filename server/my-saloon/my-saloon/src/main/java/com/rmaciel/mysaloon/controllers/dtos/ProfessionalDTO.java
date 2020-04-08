package com.rmaciel.mysaloon.controllers.dtos;

import com.rmaciel.mysaloon.models.Department;
import com.rmaciel.mysaloon.models.Professional;

public class ProfessionalDTO {

    private Long id;
    private String name;
    private Department department;
    private String residencialPhone;
    private String cellphone;


    public ProfessionalDTO() {
    }

    public ProfessionalDTO(Professional professional){
        this.id = professional.getId();
        this.name = professional.getName();
        this.department = professional.getDepartment();
        this.residencialPhone = professional.getResidencialPhone();
        this.cellphone = professional.getCellphone();
    }    

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public Department getDepartment() {
        return this.department;
    }

    public String getResidencialPhone() {
        return this.residencialPhone;
    }

    public String getCellphone() {
        return this.cellphone;
    }


}