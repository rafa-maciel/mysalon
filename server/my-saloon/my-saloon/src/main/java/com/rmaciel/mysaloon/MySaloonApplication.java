package com.rmaciel.mysaloon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport
public class MySaloonApplication {

	public static void main(String[] args) {
		SpringApplication.run(MySaloonApplication.class, args);
	}

}
