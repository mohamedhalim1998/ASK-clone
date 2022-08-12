package com.mohamed.halim.essa.askclone.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.services.ProfileService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/profile")
@Slf4j
public class ProfileController {
   private ProfileService profileService;

   public ProfileController(ProfileService profileService) {
      this.profileService = profileService;
   }

   @PostMapping("/update")
   public ResponseEntity<Map<String, String>> updateProfileInfo(@RequestBody ProfileDto profileDto,
         HttpServletResponse response, HttpServletRequest request) {
      log.info(profileDto.toString());
      try {
         String username = JwtUtils.extractUsername(request);
         log.info(username);
         profileDto.setUsername(username);
         profileService.updateProfile(profileDto);
      } catch (Exception e) {
         log.error(e.getMessage());
         log.error(e.toString());
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
      }
      return ResponseEntity.status(HttpStatus.OK).build();
   }

   @GetMapping
   public Object getProfileInfo(HttpServletRequest request) {
      try {
         String username = JwtUtils.extractUsername(request);
         log.info(username);
         ProfileDto profile = profileService.getProfile(username);
         log.info(profile.toString());
         return profile;
      } catch (Exception e) {
         log.error(e.getMessage());
         log.error(e.toString());
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
      }

   }

}
