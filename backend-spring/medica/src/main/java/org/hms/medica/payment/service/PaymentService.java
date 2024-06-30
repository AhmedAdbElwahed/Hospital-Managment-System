package org.hms.medica.payment.service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    // @Value("${stripe.api-key}")
    private String stripeApiKey = "k_test_51PVCfoD7kDMB0EVHY3pGPb8X8oysHRvxDj8n4SpZ8A8wsgtsDjMtL93gFJHV66mMQybBP3bqHZKi8QQCa8KGpDcN00kSmMMyQL";

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
                                                        .setCurrency("EGP")
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Book Appointment")
                                                                        .build()
                                                        )
                                                        .setUnitAmount(2000L)
                                                        .build()
                                        )
                                        .setQuantity(1L)
                                        .build()
                        )
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("write the url here")
                        .setCancelUrl("write the url here")
                        .build();

        Session session = Session.create(params);
        return session.getUrl();
    }
}