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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
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
            String token = this.tokenService.build(authentication);

            return ResponseEntity.ok(new TokenDTO(token, "Bearer"));
        } catch (AuthenticationException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }

    }

}