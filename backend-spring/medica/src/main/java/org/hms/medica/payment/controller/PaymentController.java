 package org.hms.medica.payment.controller;

 import org.hms.medica.appointment.model.Appointment;
 import org.hms.medica.appointment.repository.AppointmentRepository;
 import org.hms.medica.payment.service.PaymentService;
 import com.stripe.model.Event;
 import com.stripe.model.checkout.Session;
 import com.stripe.net.Webhook;
 import org.springframework.web.bind.annotation.PostMapping;
 import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RestController;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.beans.factory.annotation.Value;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;
 import jakarta.servlet.http.HttpServletRequest;
 import java.io.IOException;
 import com.stripe.Stripe;
 import com.stripe.exception.SignatureVerificationException;
 import org.springframework.http.HttpStatus;
 import org.springframework.stereotype.Controller;
 import org.springframework.web.bind.annotation.RequestHeader;
 import com.stripe.exception.StripeException;
 import com.stripe.model.Customer;
 import com.stripe.model.Product;
 import com.stripe.param.checkout.SessionCreateParams;
 import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
 import org.springframework.web.bind.annotation.CrossOrigin;
 import org.springframework.web.bind.annotation.RequestBody;

 @Controller
 @RequestMapping("/api/payment")
 public class PaymentController {

  @Autowired
  private PaymentService paymentService;

  @Autowired
  private AppointmentRepository appointmentRepository;

//  @Value("${stripe.webhook-secret}")
  private String endpointSecret = "whsec_203b159fd8c918adc2c0ecd573e7b5029cca5dc01f459e9a9926d46962f27f6c";

  @PostMapping("/create-checkout-session")
  public ResponseEntity<String> createCheckoutSession(@RequestParam("appointmentId") Long appointmentId,
                                                      @RequestParam("amount") double amount,
                                                      @RequestParam("currency") String currency) {
   try {
    String checkoutUrl = paymentService.createCheckoutSession(appointmentId, amount, currency);
    return ResponseEntity.ok(checkoutUrl);
   } catch (Exception e) {
    return ResponseEntity.status(500).body("Error creating checkout session: " + e.getMessage());
   }
  }

//  @PostMapping("/webhook")
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
     Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
     handleCheckoutSession(session);
    }

    return ResponseEntity.ok("Webhook received");
   } catch (Exception e) {
    return ResponseEntity.badRequest().build();
   }
  }

  private void handleCheckoutSession(Session session) {
   String appointmentId = session.getMetadata().get("appointment_id");
   Appointment appointment = appointmentRepository.findById(Long.parseLong(appointmentId)).orElse(null);

   if (appointment != null) {
    appointment.setPaid(true);
    appointmentRepository.save(appointment);
   }
  }

 }
