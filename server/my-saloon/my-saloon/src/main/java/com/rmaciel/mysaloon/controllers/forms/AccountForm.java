package com.rmaciel.mysaloon.controllers.forms;

public class AccountForm {
    private String email;
    private String password;

    public AccountForm(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
    
}