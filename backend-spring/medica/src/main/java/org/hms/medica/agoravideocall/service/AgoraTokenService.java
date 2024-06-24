// package org.hms.medica.agoravideocall.service;

// import io.agora.media.RtcTokenBuilder;
// import org.springframework.stereotype.Service;

// @Service
// public class AgoraTokenService {
// private static final String APP_ID = "56615b3358ad4edbb7678adf6ee288a5";
// private static final String APP_CERTIFICATE =
// "cb0082036a6a4053a6c66f2c556bf1ec";
// private static final int TOKEN_EXPIRATION_TIME_IN_SECONDS = 3600; // 1 hour

// public String generateToken(String channelName, String uid) {
// RtcTokenBuilder tokenBuilder = new RtcTokenBuilder();
// int timestamp = (int) (System.currentTimeMillis() / 1000 +
// TOKEN_EXPIRATION_TIME_IN_SECONDS);

// return tokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName,
// Integer.parseInt(uid), RtcTokenBuilder.Role.Role_Publisher, timestamp);
// }
// }
