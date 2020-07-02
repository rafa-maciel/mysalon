package com.rmaciel.mysaloon.controllers;

import java.util.Optional;

import javax.transaction.Transactional;

import com.rmaciel.mysaloon.config.security.TokenService;
import com.rmaciel.mysaloon.controllers.forms.AccountForm;
import com.rmaciel.mysaloon.models.UserAccount;
import com.rmaciel.mysaloon.repositories.UserAccountRepository;
import com.rmaciel.mysaloon.services.UserAccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/accounts")
public class UserAccountController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserAccountService userAccountService;
    
    @PostMapping("/reset")
    @Transactional
    public ResponseEntity<?> resetOwnPassword(@RequestHeader("Authorization") String token, @RequestBody AccountForm form) {
        token = token.substring(7, token.length());
        Long accountId = tokenService.getAccountId(token);
        Optional<UserAccount> accountOptional = userAccountRepository.findById(accountId);
        if (!accountOptional.isPresent())
            return ResponseEntity.badRequest().build();
        
        UserAccount account = accountOptional.get();
        account.changePassword(form.getPassword());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/restore")
    @Transactional
    public ResponseEntity<?> generateNewPassword(@RequestBody AccountForm form) {
        Optional<UserAccount> optionalAccount = userAccountRepository.findByEmail(form.getEmail());
        if (!optionalAccount.isPresent())
            return ResponseEntity.badRequest().build();

        UserAccount account = optionalAccount.get();
        userAccountService.resetPassword(account);

        return ResponseEntity.ok().build();
    }
}