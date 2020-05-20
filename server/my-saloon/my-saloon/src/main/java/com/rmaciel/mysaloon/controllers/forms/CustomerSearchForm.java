package com.rmaciel.mysaloon.controllers.forms;

import com.rmaciel.mysaloon.models.Customer;
import com.rmaciel.mysaloon.repositories.specifications.CustomerSpecification;
import com.rmaciel.mysaloon.repositories.specifications.SearchCriteria;

import org.springframework.data.jpa.domain.Specification;

public class CustomerSearchForm {
    private String fullname;
    private String phone;
    private String indicatedBy;
    private Long professionalEngagedId;


    public CustomerSearchForm(String fullname, String phone, String indicatedBy, Long professionalEngagedId) {
        this.fullname = fullname;
        this.phone = phone;
        this.indicatedBy = indicatedBy;
        this.professionalEngagedId = professionalEngagedId;
    }

    public Specification<Customer> buildSpecification() {
        return CustomerSpecification.getByFullname(new SearchCriteria<String>(fullname))
            .and(CustomerSpecification.getByAnyPhone(new SearchCriteria<String>(phone)))
            .and(CustomerSpecification.getByIndicatedBy(new SearchCriteria<String>(indicatedBy)))
            .and(CustomerSpecification.getByProfessionalEngaged(new SearchCriteria<Long>(professionalEngagedId)));
    }

    public String getFullname() {
        return this.fullname;
    }

    public String getPhone() {
        return this.phone;
    }

    public String getIndicatedBy() {
        return this.indicatedBy;
    }

    public Long getProfessionalEngagedId() {
        return professionalEngagedId;
    }

    
}