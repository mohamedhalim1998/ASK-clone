package com.mohamed.halim.essa.askclone.config;

import java.sql.Date;
import java.util.concurrent.TimeUnit;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.context.annotation.Bean;
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
            jwt.getSubject(), null);
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);

   }

}
