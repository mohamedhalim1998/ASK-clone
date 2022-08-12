package com.mohamed.halim.essa.askclone.config;

import java.sql.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtils {
   // DON't use this in production code
   private Algorithm algorithm;

   public JwtUtils() {
      algorithm = Algorithm.HMAC256("secret");
   }

   public String generateJwt(String subject, String issuer) {
      String accessToken = JWT.create().withSubject(subject).withExpiresAt(
            new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(14)))
            .withIssuer(issuer)
            .sign(algorithm);
      return accessToken;
   }

   public void verify(String token) {
      JWTVerifier verifier = JWT.require(algorithm).build();
      DecodedJWT jwt = verifier.verify(token);
      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            jwt.getSubject(), "",
            List.of());
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);

   }

   public String extractJwtToken(HttpServletRequest request) throws IllegalAccessException {
      String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
         String token = authHeader.substring("Bearer ".length());
         log.info(token);
         return token;
      }
      throw new IllegalAccessException("AUTHORIZATION header not valid");
   }

   public String extractUsername(HttpServletRequest request) throws IllegalAccessException {
      JWTVerifier verifier = JWT.require(algorithm).build();
      String token = extractJwtToken(request);
      DecodedJWT jwt = verifier.verify(token);
      return jwt.getSubject();
   }

}
