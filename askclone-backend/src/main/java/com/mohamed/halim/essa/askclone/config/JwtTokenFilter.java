package com.mohamed.halim.essa.askclone.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {
   private JwtUtils jwtUtils;

   public JwtTokenFilter(JwtUtils jwtUtils) {
      this.jwtUtils = jwtUtils;
   }

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
         throws ServletException, IOException {

      if (request.getRequestURI().equals("/user/login") || request.getRequestURI().equals("/user/signup")) {
         filterChain.doFilter(request, response);
      } else {
         String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
         if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring("Bearer ".length());
            try {
               jwtUtils.verify(token);
               filterChain.doFilter(request, response);
            } catch (Exception e) {
               log.error(e.getMessage());
               response.setStatus(HttpStatus.FORBIDDEN.value());
               Map<String, String> map = new HashMap<>();
               map.put("error", e.getMessage());
               response.getWriter().write(
                     new ObjectMapper().writeValueAsString(map));
            }
         } else {
            filterChain.doFilter(request, response);
         }
      }

   }

}
