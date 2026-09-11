package com.lexflow.caseservice.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtAuthInterceptor implements HandlerInterceptor {

    private final JwtUtils jwtUtils;

    @Autowired
    public JwtAuthInterceptor(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Allow CORS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String path = request.getRequestURI();

        // Public routes
        if (path.startsWith("/api/v1/auth") || path.startsWith("/h2-console") || "GET".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        // Check Authorization header
        String authHeader = request.getHeader("Authorization");
        String role = "ANONYMOUS";

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtils.validateToken(token)) {
                role = jwtUtils.getRoleFromToken(token);
                request.setAttribute("userRole", role);
                request.setAttribute("userEmail", jwtUtils.getEmailFromToken(token));
            }
        }

        // Enforce RBAC rules
        // Registration approval requires REGISTRAR or ADMIN
        if (path.contains("/register") && !role.equals("REGISTRAR") && !role.equals("ADMIN")) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"FORBIDDEN\",\"message\":\"Access denied. Registration approval requires REGISTRAR role.\"}");
            return false;
        }

        // Raising deficiencies requires SCRUTINY_OFFICER or ADMIN
        if (path.contains("/deficiencies") && "POST".equalsIgnoreCase(request.getMethod()) && !role.equals("SCRUTINY_OFFICER") && !role.equals("ADMIN")) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"FORBIDDEN\",\"message\":\"Access denied. Raising scrutiny deficiencies requires SCRUTINY_OFFICER role.\"}");
            return false;
        }

        return true;
    }
}
