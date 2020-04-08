package com.rmaciel.mysaloon.controllers.forms;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.rmaciel.mysaloon.models.Customer;
import com.rmaciel.mysaloon.models.Professional;
import com.rmaciel.mysaloon.repositories.ProfessionalRepository;

public class CustomerForm {

    @NotNull @NotEmpty @Size(min = 3, max = 50)
    private String fullname;

    @Size(max = 16)
    private String residencialPhone;

    @Size(max = 16)
    private String cellphone;

    @Size(max = 40)
    private String indicatedBy;

    private Long professionalEngagedID;


    public CustomerForm(String fullname, String residencialPhone, String cellphone, String indicatedBy, Long professionalEngagedID) {
        this.fullname = fullname;
        this.residencialPhone = residencialPhone;
        this.cellphone = cellphone;
        this.indicatedBy = indicatedBy;
        this.professionalEngagedID = professionalEngagedID;
    }

    public Customer convert(ProfessionalRepository professionalRepository) {
        Professional professional = professionalRepository.findById(professionalEngagedID).get();
    
        return new Customer(fullname, residencialPhone, cellphone, indicatedBy, professional);
    }

    public void updateTo(Customer customer, ProfessionalRepository professionalRepository) {
        customer.setCellphone(cellphone);
        customer.setFullname(fullname);
        customer.setIndicatedBy(indicatedBy);
        customer.setResidencialPhone(residencialPhone);

        customer.setProfessionalEngaged(professionalRepository.findById(professionalEngagedID).get());
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

    public Long getProfessionalEngagedID() {
        return this.professionalEngagedID;
    }


    


}