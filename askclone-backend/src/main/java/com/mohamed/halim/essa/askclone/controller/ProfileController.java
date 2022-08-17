package com.mohamed.halim.essa.askclone.controller;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
   public ResponseEntity<Map<String, String>> updateProfileInfo(@RequestPart("profile") ProfileDto profileDto,
         @RequestPart(required = false) MultipartFile profileImage,
         @RequestPart(required = false) MultipartFile coverImage,
         HttpServletResponse response, HttpServletRequest request) {
      log.info(profileDto.toString());
      try {
         String username = JwtUtils.extractUsername(request);
         log.info(username);
         profileDto.setUsername(username);
         if (profileImage != null)
            profileDto.setProfileImageUrl(profileService.saveImage(profileImage));
         if (coverImage != null)
            profileDto.setCoverImageUrl(profileService.saveImage(coverImage));
         profileService.updateProfile(profileDto);
      } catch (Exception e) {
         e.printStackTrace();
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
         e.printStackTrace();
         log.error(e.getMessage());
         log.error(e.toString());
         Map<String, String> map = new HashMap<>();
         map.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
      }

   }

   @GetMapping("/image/{name}")
   public ResponseEntity<Resource> getImage(@PathVariable String name, HttpServletRequest request)
         throws FileNotFoundException {
      Resource resource = profileService.loadImage(name);
      return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);

   }

}
