package com.rmaciel.mysaloon.repositories;

import com.rmaciel.mysaloon.models.Payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
}