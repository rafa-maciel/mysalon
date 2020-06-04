package com.rmaciel.mysaloon.repositories;

import java.util.Optional;

import com.rmaciel.mysaloon.models.Professional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;

public interface ProfessionalRepository extends CrudRepository<Professional, Long>{
    
    @Override
    @Cacheable("allProfessionals")
    public Iterable<Professional> findAll();

    @Override
    @CacheEvict(value = "allProfessionals", allEntries = true)
    public <S extends Professional> S save(S entity);

    @Override
    @CacheEvict(value = "allProfessionals", allEntries = true)
    public void delete(Professional entity);

	public Optional<Professional> findByAccountEmail(String email);
}