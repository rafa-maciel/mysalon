package com.rmaciel.mysaloon.services;

import com.rmaciel.mysaloon.models.AccountRole;
import com.rmaciel.mysaloon.models.Professional;
import com.rmaciel.mysaloon.models.UserAccount;
import com.rmaciel.mysaloon.repositories.UserAccountRepository;
import com.rmaciel.mysaloon.utils.StringGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class UserAccountService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UserAccountRepository repository;

    @Value("${mysaloon.mail.sender}")
    private String from;
    

    public void create(Professional professional, String email, AccountRole role) {
        String generatedPassoword = StringGenerator.secure(12);

        UserAccount user = new UserAccount(professional, email, generatedPassoword, role != null ? role : AccountRole.ADMIN);
        repository.save(user);
        sendNewPasswordEmail(user, generatedPassoword);
    }

    public void resetPassword(UserAccount user) {
        String generatedPassoword = StringGenerator.secure(12);
        user.changePassword(generatedPassoword);

        String subject = "MySaloon - Solicitação de Reset de Senha";
        String text = "Uma solicitação de alteração de senha foi realizada pelo administrado, sua nova senha é: " + generatedPassoword;

        this.sendPasswordEmail(user, generatedPassoword, subject, text);
    }

    private void sendNewPasswordEmail(UserAccount user, String password) {
        String subject = "MySaloon - Sua conta foi criada";
        String text = "Sua conta foi criada no sistema MySaloon, senha gerada: " + password;
        this.sendPasswordEmail(user, password, subject, text);
    }

    private void sendPasswordEmail(UserAccount user, String password, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);
    }
}