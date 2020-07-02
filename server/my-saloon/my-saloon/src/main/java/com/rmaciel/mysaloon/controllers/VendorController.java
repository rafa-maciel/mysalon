package com.rmaciel.mysaloon.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.rmaciel.mysaloon.controllers.dtos.VendorDTO;
import com.rmaciel.mysaloon.controllers.forms.VendorForm;
import com.rmaciel.mysaloon.models.Vendor;
import com.rmaciel.mysaloon.repositories.VendorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vendors")
public class VendorController {

    @Autowired
    private VendorRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<VendorDTO> create(@Valid @RequestBody VendorForm form) {
        Vendor vendor = form.convert();
        repository.save(vendor);

        return ResponseEntity.status(HttpStatus.CREATED).body(new VendorDTO(vendor));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendorDTO> read(@PathVariable Long id) {
        Optional<Vendor> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return ResponseEntity.ok(new VendorDTO(optional.get()));
    }

    @PutMapping("/{id}")
    @Transactional
    @CacheEvict(value = "allVendors", allEntries = true)
    public ResponseEntity<VendorDTO> update(@PathVariable Long id, @RequestBody VendorForm form) {
        Optional<Vendor> optional = repository.findById(id); 
        if (!optional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        
        Vendor vendor = optional.get();
        form.updateTo(vendor);

        return ResponseEntity.ok(new VendorDTO(vendor));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Vendor> optional = repository.findById(id); 
        if (!optional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        repository.delete(optional.get());
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<List<VendorDTO>> listAll() {
        List<VendorDTO> vendors = new ArrayList<>();
        repository.findAll().forEach(vendor -> vendors.add(new VendorDTO(vendor)));

        return ResponseEntity.ok(vendors);
    }



}