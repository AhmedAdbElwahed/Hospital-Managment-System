// package org.hms.medica.agoravideocall.controller;

// import org.hms.medica.agoravideocall.service.AgoraTokenService;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.HashMap;
// import java.util.Map;

// @RestController
// public class AgoraTokenController {
// private final AgoraTokenService agoraTokenService;

// public AgoraTokenController(AgoraTokenService agoraTokenService) {
// this.agoraTokenService = agoraTokenService;
// }

// @GetMapping("/agora/token")
// public Map<String, String> getToken(@RequestParam String channelName,
// @RequestParam String uid) {
// String token = agoraTokenService.generateToken(channelName, uid);
// Map<String, String> response = new HashMap<>();
// response.put("token", token);
// return response;
// }
// }
