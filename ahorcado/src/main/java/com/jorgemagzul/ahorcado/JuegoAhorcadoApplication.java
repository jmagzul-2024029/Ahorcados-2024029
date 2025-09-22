package com.jorgemagzul.ahorcado;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JuegoAhorcadoApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(JuegoAhorcadoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Api funcionando");
    }

}