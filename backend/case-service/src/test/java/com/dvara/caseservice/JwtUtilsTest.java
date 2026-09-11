package com.dvara.caseservice;

import com.dvara.caseservice.security.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilsTest {

    private JwtUtils jwtUtils;

    @BeforeEach
    void setUp() {
        jwtUtils = new JwtUtils();
    }

    @Test
    @DisplayName("Should generate valid signed HMAC-SHA256 JWT and extract claims")
    void testGenerateAndValidateToken_Success() {
        String token = jwtUtils.generateToken("usr-123", "judge@dvara.gov", "JUDGE");

        assertNotNull(token);
        assertEquals(3, token.split("\\.").length, "JWT must contain header, payload, and signature separated by dots");

        boolean isValid = jwtUtils.validateToken(token);
        assertTrue(isValid, "Token should be cryptographically valid");

        assertEquals("JUDGE", jwtUtils.getRoleFromToken(token));
        assertEquals("judge@dvara.gov", jwtUtils.getEmailFromToken(token));
    }

    @Test
    @DisplayName("Should reject tampered or corrupted JWT tokens")
    void testValidateToken_TamperedToken_ReturnsFalse() {
        String token = jwtUtils.generateToken("usr-456", "advocate@dvara.org", "ADVOCATE");
        String tamperedToken = token.substring(0, token.length() - 4) + "XXXX";

        boolean isValid = jwtUtils.validateToken(tamperedToken);
        assertFalse(isValid, "Tampered signature should fail cryptographic verification");
    }

    @Test
    @DisplayName("Should reject null or malformed tokens")
    void testValidateToken_MalformedToken_ReturnsFalse() {
        assertFalse(jwtUtils.validateToken(null));
        assertFalse(jwtUtils.validateToken("not.a.valid.jwt.string"));
        assertFalse(jwtUtils.validateToken("invalidToken"));
    }
}
