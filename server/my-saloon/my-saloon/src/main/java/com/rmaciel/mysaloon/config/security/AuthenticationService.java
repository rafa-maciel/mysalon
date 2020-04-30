package com.rmaciel.mysaloon.config.security;

import java.util.Optional;

import com.rmaciel.mysaloon.models.UserAccount;
import com.rmaciel.mysaloon.repositories.UserAccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private UserAccountRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserAccount> user = repository.findByEmail(email);

        if (user.isPresent()) return user.get();

        throw new UsernameNotFoundException("Dados inválidos");
    }

}