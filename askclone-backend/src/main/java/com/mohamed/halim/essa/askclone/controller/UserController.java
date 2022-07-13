package com.mohamed.halim.essa.askclone.controller;

import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import com.mohamed.halim.essa.askclone.model.User;
import com.mohamed.halim.essa.askclone.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
   private final UserRepository userRepository;

   public UserController(UserRepository userRepository) {
      this.userRepository = userRepository;
   }

   @PostMapping("/signup")
   public void registerUser(@RequestBody User user) {
      System.out.println(user);
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      String encodedPassword = passwordEncoder.encode(user.getPassword());
      user.setPassword(encodedPassword);
      System.out.println(user);
      userRepository.save(user);
   }

   @GetMapping("/login/success")
   public String loginSucsses() {
      return "login success";
   }

   @PostMapping("/login")
   public void login(HttpServletRequest request, @RequestBody Map<String, String> map) {
      System.out.println("user name" + map.get("username"));
      System.out.println("password" + map.get("password"));
      try {
         request.login(map.get("username"), map.get("password"));
      } catch (ServletException e) {
         e.printStackTrace();
      }
   }

}
