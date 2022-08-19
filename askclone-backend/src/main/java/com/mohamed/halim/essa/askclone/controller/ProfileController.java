package com.mohamed.halim.essa.askclone.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mohamed.halim.essa.askclone.model.dto.GuestDto;
import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.services.ImageService;
import com.mohamed.halim.essa.askclone.services.ProfileService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/profile")
@Slf4j
public class ProfileController {
   private ProfileService profileService;

   public ProfileController(ProfileService profileService, ImageService imageService) {
      this.profileService = profileService;
   }

   @PostMapping("/update")
   public ResponseEntity<Object> updateProfileInfo(@RequestPart("profile") ProfileDto profileDto,
         @RequestPart(required = false) MultipartFile profileImage,
         @RequestPart(required = false) MultipartFile coverImage,
         HttpServletResponse response, HttpServletRequest request) {
      log.info(profileDto.toString());
      try {
         String username = JwtUtils.extractUsername(request);
         log.info(username);
         profileDto.setUsername(username);
         profileService.updateProfile(profileDto, profileImage, coverImage);
         return ResponseEntity.status(HttpStatus.OK).body(profileService.getProfile(username));
      } catch (Exception e) {
         e.printStackTrace();
         log.error(e.getMessage());
         log.error(e.toString());
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
      }
   }

   @PostMapping("/update/status")
   public ResponseEntity<Object> updateStatus(@RequestBody Map<String, Boolean> requestMap,
         HttpServletRequest request) {
      try {
         String username = JwtUtils.extractUsername(request);
         profileService.updateStatus(username, requestMap.get("status"));
         return ResponseEntity.status(HttpStatus.OK).body(profileService.getProfile(username));
      } catch (Exception e) {
         e.printStackTrace();
         log.error(e.getMessage());
         log.error(e.toString());
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
      }

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
         e.printStackTrace();
         log.error(e.getMessage());
         log.error(e.toString());
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
      }

   }

   @GetMapping("/{username}")
   public ResponseEntity<Object> getGuestInfo(HttpServletRequest request, @PathVariable String username) {
      try {
         String jwtUsername = JwtUtils.extractUsername(request);
         if (username == jwtUsername) {
            ProfileDto profile = profileService.getProfile(username);
            return ResponseEntity.status(HttpStatus.OK).body(profile);
         } else {
            GuestDto guest = profileService.getGuest(username, jwtUsername);
            return ResponseEntity.status(HttpStatus.OK).body(guest);
         }
      } catch (Exception e) {
         e.printStackTrace();
         log.error(e.getMessage());
         log.error(e.toString());
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
      }

   }

   @PostMapping("/{username}/follow")
   public ResponseEntity<Object> followUser(HttpServletRequest request, @PathVariable String username,
         @RequestBody Map<String, Boolean> requestMap) {
      try {
         String jwtUsername = JwtUtils.extractUsername(request);
         boolean follow = requestMap.get("follow");
         GuestDto guest = profileService.changeFollow(username, jwtUsername, follow);
         return ResponseEntity.status(HttpStatus.OK).body(guest);
      } catch (Exception e) {
         e.printStackTrace();
         log.error(e.getMessage());
         log.error(e.toString());
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
      }

   }

}
