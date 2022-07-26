package com.mohamed.halim.essa.askclone.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohamed.halim.essa.askclone.model.AppUser;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthFilter extends UsernamePasswordAuthenticationFilter {
   private AuthenticationManager authenticationManager;

   private JwtUtils jwtUtils;

   public JwtAuthFilter(AuthenticationManager auth, JwtUtils jwtUtils) {
      this.authenticationManager = auth;
      this.jwtUtils = jwtUtils;
   }

   @Override
   public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
         throws AuthenticationException {

      try {
         AppUser user = new ObjectMapper().readValue(request.getInputStream(), AppUser.class);
         log.info(user.toString());
         UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUsername(),
               user.getPassword());
         return authenticationManager.authenticate(token);
      } catch (IOException e) {
         log.error(e.getMessage());
      }
      return super.attemptAuthentication(request, response);

   }

   @Override
   protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
         Authentication authResult) throws IOException, ServletException {
      CustomUserDetails user = (CustomUserDetails) authResult.getPrincipal();
      String accessToken = jwtUtils.generateJwt(user.getUsername(), request.getRequestURI());
      response.setHeader("access_token", accessToken);
      response.setStatus(HttpStatus.OK.value());
   }
}
