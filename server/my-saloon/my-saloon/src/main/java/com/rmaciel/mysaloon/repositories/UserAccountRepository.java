package com.rmaciel.mysaloon.repositories;

import java.util.Optional;

import com.rmaciel.mysaloon.models.UserAccount;

import org.springframework.data.repository.CrudRepository;

public interface UserAccountRepository extends CrudRepository<UserAccount, Long> {

    public Optional<UserAccount> findByEmail(String email);

}