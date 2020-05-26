package com.rmaciel.mysaloon.repositories;

import com.rmaciel.mysaloon.models.Service;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long>{
    
}