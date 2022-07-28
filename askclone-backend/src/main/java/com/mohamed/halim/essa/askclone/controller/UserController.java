package com.mohamed.halim.essa.askclone.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohamed.halim.essa.askclone.config.JwtUtils;
import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
public class UserController {
   private final UserRepository userRepository;
   private final JwtUtils jwtUtils;

   public UserController(UserRepository userRepository, JwtUtils jwtUtils) {
      this.userRepository = userRepository;
      this.jwtUtils = jwtUtils;
   }

   @PostMapping("/signup")
   public ResponseEntity<String> registerUser(@RequestBody @Valid AppUser user, HttpServletResponse response)
         throws JsonProcessingException {
      System.out.println(user);
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      String encodedPassword = passwordEncoder.encode(user.getPassword());
      user.setPassword(encodedPassword);
      System.out.println(user);
      if (userRepository.findByEmail(user.getEmail()) != null) {
         Map<String, String> map = new HashMap<>();
         map.put("error", "email already used");
         return ResponseEntity.status(HttpStatus.CONFLICT).body(new ObjectMapper().writeValueAsString(map));
      }
      if (userRepository.findByUsername(user.getUsername()) != null) {
         Map<String, String> map = new HashMap<>();
         map.put("error", "username already used");
         return ResponseEntity.status(HttpStatus.CONFLICT).body(new ObjectMapper().writeValueAsString(map));
      }
      userRepository.save(user);
      String token = jwtUtils.generateJwt(user.getUsername(), "user/signup");
      response.setHeader("access_token", token);
      return ResponseEntity.status(HttpStatus.CREATED).build();
   }

   @GetMapping("/login/verify")
   public String loginSucsses() {
      return "login success";
   }

}
