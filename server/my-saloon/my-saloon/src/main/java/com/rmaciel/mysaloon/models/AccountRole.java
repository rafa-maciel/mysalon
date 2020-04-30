package com.rmaciel.mysaloon.models;

import org.springframework.security.core.GrantedAuthority;

public enum AccountRole implements GrantedAuthority{
    ADMIN("Administrativo"), PROFESSIONAL("profissional");

    private final String label;

	private AccountRole(String label) {
		this.label = label;
    }

    @Override
    public String getAuthority() {
        return this.toString();
    }

    public String getLabel() {
        return label;
    }

}
