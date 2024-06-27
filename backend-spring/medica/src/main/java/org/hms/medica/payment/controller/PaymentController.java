package org.hms.medica.payment.controller;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Value("${stripe.webhook-secret}")
    private String endpointSecret;

    @PostMapping("/create-payment-link")
    public ResponseEntity<String> createPaymentLink(@RequestParam double amount, @RequestParam String currency, @RequestParam Long appointmentId) {
        try {
            String paymentLinkUrl = paymentService.createPaymentLink(amount, currency, appointmentId);
            return ResponseEntity.ok(paymentLinkUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating payment link: " + e.getMessage());
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(HttpServletRequest request) {
        String payload;
        String sigHeader = request.getHeader("Stripe-Signature");

        try {
            payload = request.getReader().lines().reduce("", String::concat);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getData().getObject();
                handleCheckoutSession(session);
            }

            return ResponseEntity.ok("Webhook received");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private void handleCheckoutSession(Session session) {
        // Extract your custom identifier from session metadata or other fields
        String appointmentId = session.getMetadata().get("appointment_id");

        // Fetch the appointment from the database
        Appointment appointment = appointmentRepository.findById(Long.parseLong(appointmentId)).orElse(null);

        if (appointment != null) {
            // Mark the appointment as paid
            appointment.setPaid(true);
            appointmentRepository.save(appointment);
        }
    }
}
