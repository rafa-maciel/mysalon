package com.rmaciel.mysaloon.config.security;

import java.util.Date;

import com.rmaciel.mysaloon.models.UserAccount;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

    @Value("${mysaloon.jwt.expiration}")
    private String expirationTime;

    @Value("${mysaloon.jwt.secret}")
    private String jwtSecret;

	public String build(Authentication authentication) {
        UserAccount principal = (UserAccount) authentication.getPrincipal();
        Date timenow = new Date();
        Date expiration = new Date(timenow.getTime() + Long.parseLong(this.expirationTime));

        return Jwts.builder()
            .setIssuer("MySaloon API")
            .setSubject(principal.getId().toString())
            .setIssuedAt(timenow)
            .setExpiration(expiration)
            .signWith(SignatureAlgorithm.HS256, this.jwtSecret)
            .compact();
    }

	public boolean isValid(String token) {
        return this.getTokenClaims(token) != null;
	}

	public Long getAccountId(String token) {
        Claims tokenClaims = this.getTokenClaims(token);
        return Long.parseLong(tokenClaims.getSubject());
    }

	private Claims getTokenClaims(String token) {
		try {
            return Jwts.parser().setSigningKey(this.jwtSecret).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            return null;
        }
	}

}