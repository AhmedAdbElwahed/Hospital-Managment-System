package org.hms.medica.auth.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587); // or your SMTP port
        mailSender.setUsername("os.omarsalah@gmail.com");
        mailSender.setPassword("urzmokjzfhbyxzrl");
        // You can configure additional properties here if needed
        return mailSender;
    }
}
