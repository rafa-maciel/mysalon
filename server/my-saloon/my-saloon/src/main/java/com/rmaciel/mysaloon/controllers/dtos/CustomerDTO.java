package com.rmaciel.mysaloon.controllers.dtos;

import com.rmaciel.mysaloon.models.Customer;

public class CustomerDTO {
    private Long id;
    private String fullname;
    private String residencialPhone;
    private String cellphone;
    private String indicatedBy;
    private String professionalEngagedName;


    public CustomerDTO(Customer customer) {
        this.id = customer.getId();
        this.fullname = customer.getFullname();
        this.residencialPhone = customer.getResidencialPhone();
        this.cellphone = customer.getCellphone();
        this.indicatedBy = customer.getIndicatedBy();
        this.professionalEngagedName = customer.getProfessionalEngaged().getName();
    }


    public Long getId() {
        return this.id;
    }

    public String getFullname() {
        return this.fullname;
    }

    public String getResidencialPhone() {
        return this.residencialPhone;
    }

    public String getCellphone() {
        return this.cellphone;
    }

    public String getIndicatedBy() {
        return this.indicatedBy;
    }

    public String getProfessionalEngagedName() {
        return this.professionalEngagedName;
    }

}   