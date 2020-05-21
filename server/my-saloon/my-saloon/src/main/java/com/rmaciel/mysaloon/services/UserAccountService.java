package com.rmaciel.mysaloon.services;

import com.rmaciel.mysaloon.models.AccountRole;
import com.rmaciel.mysaloon.models.Professional;
import com.rmaciel.mysaloon.models.UserAccount;
import com.rmaciel.mysaloon.repositories.UserAccountRepository;
import com.rmaciel.mysaloon.utils.StringGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class UserAccountService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UserAccountRepository repository;

    public void create(Professional professional, String email, AccountRole role) {
        String generatedPassoword = StringGenerator.secure(12);

        UserAccount user = new UserAccount(professional, email, generatedPassoword, role);
        repository.save(user);
        sendNewPasswordEmail(user, professional.getName(), generatedPassoword);
    }

    private void sendNewPasswordEmail(UserAccount user, String name, String generatedPassoword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rafael.macielf@gmail.com");
        message.setTo(user.getEmail());
        message.setSubject("MySaloon - Sua conta foi criada");
        message.setText("Sua conta foi criada no sistema MySaloon, senha gerada: " + generatedPassoword);

        emailSender.send(message);
    }
}