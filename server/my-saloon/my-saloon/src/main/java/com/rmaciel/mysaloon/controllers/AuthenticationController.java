package com.rmaciel.mysaloon.controllers;

import javax.validation.Valid;

import com.rmaciel.mysaloon.config.security.TokenService;
import com.rmaciel.mysaloon.controllers.dtos.TokenDTO;
import com.rmaciel.mysaloon.controllers.forms.AuthenticationForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:9000")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<TokenDTO> auth(@RequestBody @Valid AuthenticationForm form) {
        UsernamePasswordAuthenticationToken authData = form.convert();

        try {
            Authentication authentication = this.authManager.authenticate(authData);
            TokenDTO token = this.tokenService.build(authentication);

            return ResponseEntity.ok(token);
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping()
    @ResponseBody
    public Boolean isAuthenticated() {
        return true;
    }
    

}