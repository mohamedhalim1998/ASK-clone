package com.mohamed.halim.essa.askclone.controller;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.services.UserService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

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

   public UserController(UserService userService) {
      this.userService = userService;
   }

   @PostMapping("/signup")
   public ResponseEntity<String> registerUser(@RequestBody @Valid AppUser user, HttpServletResponse response)
         throws JsonProcessingException {
      log.info(user.toString());
      userService.signup(user);
      String token = JwtUtils.generateJwt(user.getUsername(), "user/signup");
      response.setHeader("access_token", token);
      return ResponseEntity.status(HttpStatus.CREATED).build();
   }

   @GetMapping("/verify")
   public ResponseEntity<Object> loginSucsses()
         throws IllegalAccessException {
      return ResponseEntity.status(HttpStatus.OK).build();
   }

}
