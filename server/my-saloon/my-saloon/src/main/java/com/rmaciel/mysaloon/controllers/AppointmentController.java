package com.rmaciel.mysaloon.controllers;

import java.util.Optional;

import javax.transaction.Transactional;

import com.rmaciel.mysaloon.controllers.dtos.AppointmentDTO;
import com.rmaciel.mysaloon.controllers.dtos.AppointmentDetailedDTO;
import com.rmaciel.mysaloon.controllers.forms.AppointmentForm;
import com.rmaciel.mysaloon.controllers.forms.AppointmentSearchForm;
import com.rmaciel.mysaloon.controllers.forms.AppointmentUpdateForm;
import com.rmaciel.mysaloon.models.Appointment;
import com.rmaciel.mysaloon.repositories.AppointmentRepository;
import com.rmaciel.mysaloon.repositories.CustomerRepository;
import com.rmaciel.mysaloon.repositories.PaymentRepository;
import com.rmaciel.mysaloon.repositories.ProfessionalRepository;
import com.rmaciel.mysaloon.repositories.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

@CrossOrigin(origins = "http://localhost:9000")
@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<AppointmentDTO> create(@RequestBody AppointmentForm form) {
        Appointment appointment = form.convert(customerRepository, professionalRepository);        
        repository.save(appointment);

        return ResponseEntity.status(HttpStatus.CREATED).body(new AppointmentDTO(appointment));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<AppointmentDetailedDTO> update(@PathVariable Long id, 
        @RequestBody AppointmentUpdateForm appointmentForm) {
        Optional<Appointment> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.badRequest().build();

        Appointment appointment = optional.get();
        appointmentForm.updateTo(appointment, customerRepository, 
            professionalRepository, serviceRepository, paymentRepository);
        
        return ResponseEntity.ok(new AppointmentDetailedDTO(appointment));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Appointment> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.badRequest().build();

        Appointment appointment = optional.get();
        repository.delete(appointment);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDetailedDTO> detailed(@PathVariable Long id) {
        Optional<Appointment> optional = repository.findById(id);
        if (!optional.isPresent())
            return ResponseEntity.badRequest().build();

        Appointment appointment = optional.get();

        return ResponseEntity.ok(new AppointmentDetailedDTO(appointment));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<AppointmentDTO>> search(AppointmentSearchForm form, Pageable pageable) {
        Specification<Appointment> specs = form.buildSpecification();
        Page<Appointment> page = repository.findAll(specs, pageable);

        return ResponseEntity.ok(page.map(AppointmentDTO::new));
    }

    
}