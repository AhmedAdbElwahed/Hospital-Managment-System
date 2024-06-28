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

 @RestController
 @RequestMapping("/api/payment")
 public class PaymentController {

  @Autowired
  private PaymentService paymentService;

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Value("${stripe.webhook-secret}")
  private String endpointSecret;

  @PostMapping("/create-checkout-session")
  public ResponseEntity<String> createCheckoutSession(@RequestParam Long appointmentId, @RequestParam double amount, @RequestParam String currency) {
   try {
    String checkoutUrl = paymentService.createCheckoutSession(appointmentId, amount, currency);
    return ResponseEntity.ok(checkoutUrl);
   } catch (Exception e) {
    return ResponseEntity.status(500).body("Error creating checkout session: " + e.getMessage());
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


// @RestController
// @RequestMapping("/webhook")
// public class StripeWebhookController {
//
//  @Value("${stripe.webhook.secret}")
//  private String endpointSecret;
//
//  @PostMapping
//  public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
//                                                    @RequestHeader("Stripe-Signature") String sigHeader) {
//   Event event = null;
//   try {
//    event = Webhook.constructEvent(
//            payload, sigHeader, endpointSecret
//    );
//   } catch (SignatureVerificationException e) {
//    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//   }
//
//   if ("checkout.session.completed".equals(event.getType())) {
//    Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
//
//    if (session != null && "payment".equals(session.getMode()) && "paid".equals(session.getPaymentStatus())) {
//     try {
//      Order order = orderRepository.findById(session.getClientReferenceId()).orElseThrow();
//      order.setPaid(true);
//      order.setStripeId(session.getPaymentIntent());
//      orderRepository.save(order);
//
//      // launch asynchronous task
//      paymentCompletedTask.launch(order.getId());
//      System.out.println("Hello from webhook");
//     } catch (NoSuchElementException e) {
//      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
//    }
//   }
//
//   return new ResponseEntity<>(HttpStatus.OK);
//  }
// }