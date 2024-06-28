package org.hms.medica.payment.service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

 @Value("${stripe.api-key}")
 private String stripeApiKey;

 public PaymentService() {
  Stripe.apiKey = stripeApiKey;
 }

 public String createCheckoutSession(Long appointmentId, double amount, String currency) throws Exception {
     SessionCreateParams params =
             SessionCreateParams.builder()
                     .addLineItem(
                             SessionCreateParams.LineItem.builder()
                                     .setPriceData(
                                             SessionCreateParams.LineItem.PriceData.builder()
                                                     .setCurrency("usd")
                                                     .setProductData(
                                                             SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                     .setName("T-shirt")
                                                                     .build()
                                                     )
                                                     .setUnitAmount(2000L)
                                                     .build()
                                     )
                                     .setQuantity(1L)
                                     .build()
                     )
                     .setMode(SessionCreateParams.Mode.PAYMENT)
                     .setSuccessUrl("http://localhost:4242/success.html")
                     .setCancelUrl("http://localhost:4242/cancel.html")
                     .build();

     Session session = Session.create(params);
  return session.getUrl();
 }
}



//package org.hms.medica.payment.service;
//
//import com.stripe.Stripe;
//import com.stripe.model.PaymentLink;
//import com.stripe.param.PaymentLinkCreateParams;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import jakarta.annotation.PostConstruct;
//
//@Service
//public class PaymentService {
//
//    @Value("${stripe.api-key}")
//    private String stripeApiKey;
//
//    @PostConstruct
//    public void init() {
//        Stripe.apiKey = stripeApiKey;
//    }

//    public String createPaymentLink(double amount, String currency, Long appointmentId) throws Exception {
//        PaymentLinkCreateParams params = PaymentLinkCreateParams.builder()
//                .addLineItem(
//                        PaymentLinkCreateParams.LineItem.builder()
//                                .setPriceData(
//                                        PaymentLinkCreateParams.LineItem.PriceData.builder()
//                                                .setCurrency(currency)
//                                                .setProductData(
//                                                        PaymentLinkCreateParams.LineItem.PriceData.ProductData.builder()
//                                                                .setName("Appointment Booking")
//                                                                .build()
//                                                )
//                                                .setUnitAmount((long) (amount * 100)) // amount in cents
//                                                .build()
//                                )
//                                .setQuantity(1L)
//                                .build()
//                )
//                .setAfterCompletion(
//                        PaymentLinkCreateParams.AfterCompletion.builder()
//                                .setType(PaymentLinkCreateParams.AfterCompletion.Type.REDIRECT)
//                                .setRedirect(
//                                        PaymentLinkCreateParams.AfterCompletion.Redirect.builder()
//                                                .setUrl("http://localhost:8080/success") // Replace with your redirect URL
//                                                .build()
//                                )
//                                .build()
//                )
//                .putMetadata("appointment_id", appointmentId.toString()) // Add appointment ID to metadata
//                .build();
//
//        PaymentLink paymentLink = PaymentLink.create(params);
//        return paymentLink.getUrl();
//    }
//}
