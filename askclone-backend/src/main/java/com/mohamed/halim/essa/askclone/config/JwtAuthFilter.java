package com.mohamed.halim.essa.askclone.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

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


   public JwtAuthFilter(AuthenticationManager auth) {
      this.authenticationManager = auth;
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
      String accessToken = JwtUtils.generateJwt(user.getUsername(), request.getRequestURI());
      response.setHeader("access_token", accessToken);
      response.setStatus(HttpStatus.OK.value());
   }

   @Override
   protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
         AuthenticationException failed) throws IOException, ServletException {

      Map<String, String> map = new HashMap<>();
      map.put("error", "username or password incorrect");
      response.getWriter().write(new ObjectMapper().writeValueAsString(map));
      response.setStatus(HttpStatus.UNAUTHORIZED.value());

   }
}
