package com.mohamed.halim.essa.askclone.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {
   private UserRepository repository;
   @Autowired
   private ProfileService profileService;

   public UserService(UserRepository repository) {
      this.repository = repository;
   }

   public void signup(AppUser user) {
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      String encodedPassword = passwordEncoder.encode(user.getPassword());
      user.setPassword(encodedPassword);
      log.info(user.toString());
      if (repository.findByEmail(user.getEmail()) != null) {
         throw new IllegalArgumentException("email already used");
      }
      if (repository.findByUsername(user.getUsername()) != null) {
         throw new IllegalArgumentException("username already used");
      }
      repository.save(user);
      profileService.save(user);
   }

}
