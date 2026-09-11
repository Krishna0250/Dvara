package com.lexflow.caseservice.security;

import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * Standard RFC 7519 HMAC-SHA256 JWT Token Utility.
 * Generates and cryptographically validates signed bearer tokens.
 */
@Component
public class JwtUtils {

    private static final String SECRET_KEY = "LexFlowSecretKeyForJudicialWorkflowAuthenticationSigning2026";
    private static final long EXPIRATION_MS = 86400000L; // 24 hours

    public String generateToken(String userId, String email, String role) {
        long now = System.currentTimeMillis();
        long exp = now + EXPIRATION_MS;

        // Header: {"alg":"HS256","typ":"JWT"}
        String headerJson = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        String headerEncoded = Base64.getUrlEncoder().withoutPadding().encodeToString(headerJson.getBytes(StandardCharsets.UTF_8));

        // Payload
        String payloadJson = String.format(
                "{\"sub\":\"%s\",\"email\":\"%s\",\"role\":\"%s\",\"iat\":%d,\"exp\":%d}",
                userId, email, role, now / 1000, exp / 1000
        );
        String payloadEncoded = Base64.getUrlEncoder().withoutPadding().encodeToString(payloadJson.getBytes(StandardCharsets.UTF_8));

        // HMAC-SHA256 Signature
        String signature = sign(headerEncoded + "." + payloadEncoded);

        return headerEncoded + "." + payloadEncoded + "." + signature;
    }

    public boolean validateToken(String token) {
        if (token == null || !token.contains(".")) {
            return false;
        }
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            return false;
        }

        String data = parts[0] + "." + parts[1];
        String expectedSig = sign(data);
        if (!expectedSig.equals(parts[2])) {
            return false;
        }

        // Check expiration
        try {
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            if (payloadJson.contains("\"exp\":")) {
                int expIdx = payloadJson.indexOf("\"exp\":") + 6;
                int endIdx = payloadJson.indexOf("}", expIdx);
                if (endIdx == -1) endIdx = payloadJson.indexOf(",", expIdx);
                long expSec = Long.parseLong(payloadJson.substring(expIdx, endIdx).trim());
                if ((System.currentTimeMillis() / 1000) > expSec) {
                    return false;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getRoleFromToken(String token) {
        try {
            String[] parts = token.split("\\.");
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            int roleIdx = payloadJson.indexOf("\"role\":\"") + 8;
            int endIdx = payloadJson.indexOf("\"", roleIdx);
            return payloadJson.substring(roleIdx, endIdx);
        } catch (Exception e) {
            return "CITIZEN";
        }
    }

    public String getEmailFromToken(String token) {
        try {
            String[] parts = token.split("\\.");
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            int emailIdx = payloadJson.indexOf("\"email\":\"") + 9;
            int endIdx = payloadJson.indexOf("\"", emailIdx);
            return payloadJson.substring(emailIdx, endIdx);
        } catch (Exception e) {
            return "unknown";
        }
    }

    private String sign(String data) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secret_key);
            byte[] rawHmac = sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Failed to calculate HMAC signature", e);
        }
    }
}
