package org.hms.medica.EmailService;

// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.stereotype.Service;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.SimpleMailMessage;

// @Service
// public class EmailService {
//     private final JavaMailSender mailsender;

//     @Autowired
//     public EmailService(JavaMailSender mailSender) {
//         this.mailsender = mailSender;
//     }

//     public void sendEmail(String to, String subject, String message) {

//         SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//         simpleMailMessage.setFrom("os.omarsalah@gmail.com");
//         simpleMailMessage.setTo(to);
//         simpleMailMessage.setSubject(subject);
//         simpleMailMessage.setText(message);

//         this.mailsender.send(simpleMailMessage);
//     }

// }

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("os.omarsalah@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
        System.out.println("Mail Send...");
    }

}
