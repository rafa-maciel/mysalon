package com.rmaciel.mysaloon.repositories;

import com.rmaciel.mysaloon.models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}