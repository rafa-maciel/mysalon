package com.rmaciel.mysaloon.services;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class RestHeaders {

    @Value("${mysaloon.pagseguro.auth}")
    private String credentials;
    
    public HttpHeaders getHeaderAuth() {
        String basicAuth = new String(Base64.encodeBase64(credentials.getBytes()));
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Basic " + basicAuth);

        return httpHeaders;
    }
    
}