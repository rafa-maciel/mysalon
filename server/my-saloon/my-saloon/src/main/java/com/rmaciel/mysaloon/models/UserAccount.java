package com.rmaciel.mysaloon.models;

import java.util.Arrays;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "users")
public class UserAccount implements UserDetails {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = true, orphanRemoval = true)
    @JoinColumn(referencedColumnName = "id", name = "professional_id")
    private Professional professional;

    @NotEmpty
    @Email
    @Column(unique = true)
    private String email;

    @NotEmpty
    @NotNull
    private String password;

    private boolean enabled = true;

    @Enumerated(EnumType.STRING)
    private AccountRole role = AccountRole.PROFESSIONAL;


    public UserAccount() {
    }

    public UserAccount(Professional professional, String email, String password, AccountRole role) {
        this.professional = professional;
        this.email = email;
        this.role = role;
        this.password = new BCryptPasswordEncoder().encode(password);
    }

    public void changePassword(String password) {
        this.password = new BCryptPasswordEncoder().encode(password);
    }


    public Long getId() {
        return this.id;
    }

    public Professional getProfessional() {
        return this.professional;
    }

    public String getEmail() {
        return this.email;
    }

    public boolean getEnabled() {
        return this.enabled;
    }

    public AccountRole getRole() {
        return this.role;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(this.role);
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }



}