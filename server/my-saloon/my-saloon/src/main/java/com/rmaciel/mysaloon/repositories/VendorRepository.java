package com.rmaciel.mysaloon.repositories;

import com.rmaciel.mysaloon.models.Vendor;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;

public interface VendorRepository extends CrudRepository<Vendor, Long>{

    @Override
    @Cacheable(value = "allVendors")
    public Iterable<Vendor> findAll();

    @Override
    @CacheEvict(value = "allVendors", allEntries = true)
    public <S extends Vendor> S save(S entity);

    @Override
    @CacheEvict(value = "allVendors", allEntries = true)
    public void delete(Vendor entity);

}