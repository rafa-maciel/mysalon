package com.rmaciel.mysaloon.repositories;

import com.rmaciel.mysaloon.models.Customer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CustomerRepository extends JpaRepository<Customer, Long>, JpaSpecificationExecutor<Customer> {
    public Page<Customer> findByFullnameContainingAndProfessionalEngagedNameContaining(String fullname, String professionalEngagedName, Pageable pageable);
}