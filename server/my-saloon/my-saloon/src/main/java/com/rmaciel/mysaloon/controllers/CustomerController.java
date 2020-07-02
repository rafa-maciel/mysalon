package com.rmaciel.mysaloon.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.rmaciel.mysaloon.controllers.dtos.CustomerDTO;
import com.rmaciel.mysaloon.controllers.forms.CustomerForm;
import com.rmaciel.mysaloon.controllers.forms.CustomerSearchForm;
import com.rmaciel.mysaloon.models.Customer;
import com.rmaciel.mysaloon.repositories.CustomerRepository;
import com.rmaciel.mysaloon.repositories.ProfessionalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository repository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<CustomerDTO> create(@RequestBody @Valid final CustomerForm form) {
        final Customer customer = form.convert(professionalRepository);
        repository.save(customer);

        return ResponseEntity.status(HttpStatus.CREATED).body(new CustomerDTO(customer));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> read(@PathVariable final Long id) {
        final Optional<Customer> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        
        return ResponseEntity.ok(new CustomerDTO(optional.get()));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<CustomerDTO> update(@PathVariable final Long id, @RequestBody final CustomerForm form) {
        final Optional<Customer> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        final Customer customer = optional.get();
        form.updateTo(customer, professionalRepository);

        return ResponseEntity.ok(new CustomerDTO(customer));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        final Optional<Customer> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        repository.delete(optional.get());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<CustomerDTO>> listAll() {
        List<CustomerDTO> customers = repository.findAll()
            .stream().map(customer -> new CustomerDTO(customer))
            .collect(Collectors.toList());

        return ResponseEntity.ok(customers);
    }
    
    @GetMapping("/search")
    public Page<CustomerDTO> search(CustomerSearchForm form, Pageable pageable)  {                                                
        Specification<Customer> specs = form.buildSpecification();
        Page<Customer> page = repository.findAll(specs, pageable);
        
        return page.map(CustomerDTO::new);
    }

}