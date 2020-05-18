package com.rmaciel.mysaloon.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.rmaciel.mysaloon.controllers.dtos.PurchaseDTO;
import com.rmaciel.mysaloon.controllers.forms.PurchaseForm;
import com.rmaciel.mysaloon.controllers.forms.PurchaseSearchForm;
import com.rmaciel.mysaloon.models.Purchase;
import com.rmaciel.mysaloon.repositories.PurchaseRepository;
import com.rmaciel.mysaloon.repositories.VendorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/purchases")
@CrossOrigin(origins = "http://localhost:9000")
public class PurchaseController {

    @Autowired
    private PurchaseRepository repository;

    @Autowired
    private VendorRepository vendorRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<PurchaseDTO> create(@RequestBody PurchaseForm form) {
        Purchase purchase = form.convertTo(this.vendorRepository);
        repository.save(purchase);

        return ResponseEntity.status(HttpStatus.CREATED).body(new PurchaseDTO(purchase));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseDTO> find(@PathVariable Long id) {
        Optional<Purchase> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(new PurchaseDTO(optional.get()));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<PurchaseDTO> update(@PathVariable Long id, @RequestBody PurchaseForm form) {
        Optional<Purchase> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.badRequest().build();
        
        Purchase purchase = optional.get();
        form.update(purchase, this.vendorRepository);

        return ResponseEntity.ok(new PurchaseDTO(purchase));
    }

    @GetMapping("/search")
    public ResponseEntity<List<PurchaseDTO>> search(PurchaseSearchForm form) {
        List<Purchase> purchases = new ArrayList<>();

        Specification<Purchase> spec = form != null ? form.buildSpecification() : null;
        if (spec == null) {
            purchases = repository.findAll();
        } else {
            purchases = repository.findAll(spec);
        }

        return ResponseEntity.ok(purchases.stream().map(PurchaseDTO::new).collect(Collectors.toList()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Purchase> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.badRequest().build();

        repository.delete(optional.get());
        return ResponseEntity.ok().build();
    }

    
    
}