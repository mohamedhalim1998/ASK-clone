package com.mohamed.halim.essa.askclone.controller;

import javax.validation.Valid;

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

   public UserController(UserRepository userRepository) {
      this.userRepository = userRepository;
   }

   @PostMapping("/signup")
   public ResponseEntity<String> registerUser(@RequestBody @Valid AppUser user) {
      System.out.println(user);
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      String encodedPassword = passwordEncoder.encode(user.getPassword());
      user.setPassword(encodedPassword);
      System.out.println(user);
      if (userRepository.findByEmail(user.getEmail()) != null) {
         return ResponseEntity.status(HttpStatus.CONFLICT).body("email already used");
      }
      if (userRepository.findByUsername(user.getUsername()) != null) {
         return ResponseEntity.status(HttpStatus.CONFLICT).body("user already used");
      }

      userRepository.save(user);
      return ResponseEntity.status(HttpStatus.CREATED).build();
   }

   @GetMapping("/login/verify")
   public String loginSucsses() {
      return "login success";
   }

}
