package com.mohamed.halim.essa.askclone.controller;

import java.io.IOException;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.model.dto.FriendDto;
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
   public ResponseEntity<ProfileDto> updateProfileInfo(@RequestPart("profile") ProfileDto profileDto,
         @RequestPart(required = false) MultipartFile profileImage,
         @RequestPart(required = false) MultipartFile coverImage,
         HttpServletResponse response, HttpServletRequest request)
         throws IllegalAccessException, IllegalStateException, IOException {
      log.info(profileDto.toString());
      String username = JwtUtils.extractUsername(request);
      log.info(username);
      profileDto.setUsername(username);
      profileService.updateProfile(profileDto, profileImage, coverImage);
      return ResponseEntity.status(HttpStatus.OK).body(profileService.getProfile(username));
   }

   @PostMapping("/update/status")
   public ResponseEntity<ProfileDto> updateStatus(@RequestBody Map<String, Boolean> requestMap,
         HttpServletRequest request) throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      profileService.updateStatus(username, requestMap.get("status"));
      return ResponseEntity.status(HttpStatus.OK).body(profileService.getProfile(username));

   }

   @GetMapping
   public ProfileDto getProfileInfo(HttpServletRequest request) throws IllegalAccessException {

      String username = JwtUtils.extractUsername(request);
      log.info(username);
      ProfileDto profile = profileService.getProfile(username);
      log.info(profile.toString());
      return profile;

   }

   @GetMapping("/{username}")
   public ResponseEntity<Object> getGuestInfo(HttpServletRequest request, @PathVariable String username)
         throws IllegalAccessException {

      String jwtUsername = JwtUtils.extractUsername(request);
      if (username == jwtUsername) {
         ProfileDto profile = profileService.getProfile(username);
         return ResponseEntity.status(HttpStatus.OK).body(profile);
      } else {
         ProfileDto profile = profileService.getGuest(username, jwtUsername);
         return ResponseEntity.status(HttpStatus.OK).body(profile);
      }

   }

   @PostMapping("/{username}/follow")
   public ResponseEntity<ProfileDto> followUser(HttpServletRequest request, @PathVariable String username)
         throws IllegalAccessException {
      String jwtUsername = JwtUtils.extractUsername(request);
      ProfileDto profile = profileService.followUser(username, jwtUsername);
      return ResponseEntity.status(HttpStatus.OK).body(profile);

   }

   @PostMapping("/{username}/unfollow")
   public ResponseEntity<ProfileDto> unfollowUser(HttpServletRequest request, @PathVariable String username)
         throws IllegalAccessException {

      String jwtUsername = JwtUtils.extractUsername(request);
      ProfileDto profile = profileService.unfollowUser(username, jwtUsername);
      return ResponseEntity.status(HttpStatus.OK).body(profile);

   }

   @PostMapping("/showFriendsLike")
   public ResponseEntity<ProfileDto> showFriendsLike(HttpServletRequest request)
         throws IllegalAccessException {
      String jwtUsername = JwtUtils.extractUsername(request);
      ProfileDto profile = profileService.showFriendsLike(jwtUsername, true);
      return ResponseEntity.status(HttpStatus.OK).body(profile);

   }

   @PostMapping("/hideFriendsLike")
   public ResponseEntity<ProfileDto> hideFriendsLike(HttpServletRequest request)
         throws IllegalAccessException {

      String jwtUsername = JwtUtils.extractUsername(request);
      ProfileDto profile = profileService.showFriendsLike(jwtUsername, false);
      return ResponseEntity.status(HttpStatus.OK).body(profile);

   }

   @GetMapping("/search")
   public List<FriendDto> searchProfiles(HttpServletRequest request, @RequestParam(required = false) String query)
         throws IllegalAccessException {
      String jwtUsername = JwtUtils.extractUsername(request);
      return profileService.searchFriends(query, jwtUsername);
   }

}
