package com.mohamed.halim.essa.askclone.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohamed.halim.essa.askclone.config.JwtUtils;
import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.services.UserService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
   private final UserService userService;
   private final JwtUtils jwtUtils;

   public UserController(UserService userService, JwtUtils jwtUtils) {
      this.userService = userService;
      this.jwtUtils = jwtUtils;
   }

   @PostMapping("/signup")
   public ResponseEntity<String> registerUser(@RequestBody @Valid AppUser user, HttpServletResponse response)
         throws JsonProcessingException {
      log.info(user.toString());
      try {
         userService.signup(user);
      } catch (Exception e) {
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.CONFLICT).body(new ObjectMapper().writeValueAsString(map));
      }
      String token = jwtUtils.generateJwt(user.getUsername(), "user/signup");
      response.setHeader("access_token", token);
      return ResponseEntity.status(HttpStatus.CREATED).build();
   }

   @GetMapping("/login/verify")
   public String loginSucsses() {
      return "login success";
   }

}
