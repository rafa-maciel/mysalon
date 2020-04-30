package com.rmaciel.mysaloon.controllers.forms;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class AuthenticationForm {
    private String email;
    private String password;

    public AuthenticationForm(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public UsernamePasswordAuthenticationToken convert() {
        return new UsernamePasswordAuthenticationToken(this.email, this.password);
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

}
