//package org.hms.medica.payment.service;
//
//import com.stripe.Stripe;
//import com.stripe.model.PaymentLink;
//import com.stripe.param.PaymentLinkCreateParams;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//@Service
//public class PaymentService {
//
//    @Value("${stripe.api-key}")
//    private String stripeApiKey;
//
//    public PaymentService() {
//        Stripe.apiKey = stripeApiKey;
//    }
//
//    public String createPaymentLink(double amount, String currency, Long appointmentId) throws Exception {
//        PaymentLinkCreateParams params = PaymentLinkCreateParams.builder()
//                .addLineItem(
//                        PaymentLinkCreateParams.LineItem.builder()
//                                .setPriceData(
//                                        PaymentLinkCreateParams.LineItem.PriceData.builder()
//                                                .setCurrency("EGP")
//                                                .setProductData(
//                                                        PaymentLinkCreateParams.LineItem.PriceData.ProductData.builder()
//                                                                .setName("Appointment")
//                                                                .build()
//                                                )
//                                                .setUnitAmount((long) (amount * 100))
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
//                                                .setUrl("https://your-redirect-url.com")
//                                                .build()
//                                )
//                                .build()
//                )
//                .putMetadata("appointment_id", String.valueOf(appointmentId)) // Add appointment ID to metadata
//                .build();
//
//        PaymentLink paymentLink = PaymentLink.create(params);
//        return paymentLink.getUrl();
//    }
//}
