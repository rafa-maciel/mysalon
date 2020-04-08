package com.rmaciel.mysaloon.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.rmaciel.mysaloon.controllers.dtos.ProfessionalDTO;
import com.rmaciel.mysaloon.controllers.forms.ProfessionalForm;
import com.rmaciel.mysaloon.models.Professional;
import com.rmaciel.mysaloon.repositories.ProfessionalRepository;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/professionals")
public class ProfessionalController {

    @Autowired
    private ProfessionalRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<ProfessionalDTO> create(@Valid @RequestBody ProfessionalForm form) {
        Professional professional = form.convert();
        repository.save(professional);

        return ResponseEntity.status(HttpStatus.CREATED).body(new ProfessionalDTO(professional));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessionalDTO> read(@PathVariable Long id) {
        Professional professional = this.findOrNull(id);
        if (professional == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return ResponseEntity.ok().body(new ProfessionalDTO(professional));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<ProfessionalDTO> update(@PathVariable Long id, @RequestBody ProfessionalForm form) {
        Professional professional = this.findOrNull(id);
        if (professional == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        form.updateTo(professional);
        return ResponseEntity.ok(new ProfessionalDTO(professional));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Professional professional = this.findOrNull(id);
        if (professional == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        repository.delete(professional);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ProfessionalDTO>> listAll() {
        List<ProfessionalDTO> professionals = new ArrayList<>();
        repository.findAll().forEach(professional -> {
            professionals.add(new ProfessionalDTO(professional));
        });

        return ResponseEntity.ok().body(professionals);
    }


    private Professional findOrNull(Long id) {
        Optional<Professional> professional = repository.findById(id);
        return professional.isPresent() ? professional.get() : null;
    }

}