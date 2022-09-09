package com.mohamed.halim.essa.askclone.services;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Status;
import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProfileService {
   private ProfileRepository repository;
   private FollowService followService;
   private ImageService imageService;

   public ProfileService(ProfileRepository repository, ImageService imageService,
         FollowService followService) {
      this.imageService = imageService;
      this.repository = repository;
      this.followService = followService;
   }

   public void updateProfile(ProfileDto profileDto,
         MultipartFile profileImage,
         MultipartFile coverImage)
         throws IllegalStateException, IOException {
      if (profileImage != null)
         profileDto.setProfileImageUrl(imageService.saveImage(profileImage));
      if (coverImage != null)
         profileDto.setCoverImageUrl(imageService.saveImage(coverImage));
      repository.findById(profileDto.getUsername()).ifPresentOrElse((profile) -> {
         profile = ProfileDto.updateProfile(profileDto, profile);
         repository.save(profile);
      }, () -> {
         throw new IllegalAccessError("username not found");
      });
   }

   public void save(AppUser user) {
      Profile profile = new Profile();
      profile.setUsername(user.getUsername());
      log.info(profile.toString());
      try {
         repository.save(profile);
      } catch (Exception e) {
         log.error(e.getMessage());
         log.error(e.toString());
      }
   }

   public ProfileDto getProfile(String username) {
      Optional<Profile> profile = repository.findById(username);
      log.info(profile.toString());
      if (profile.isPresent()) {
         return ProfileDto.fromProfile(profile.get(), false);
      } else {
         throw new IllegalAccessError("username not found");
      }
   }

   public void updateStatus(String username, boolean status) {
      repository.findById(username).ifPresentOrElse((profile) -> {
         profile.setStatus(status ? Status.ONLINE : Status.INVISIBLE);
         repository.save(profile);
      }, () -> {
         throw new IllegalAccessError("username not found");
      });
   }

   public ProfileDto getGuest(String username, String jwtUsername) {
      Optional<Profile> profile = repository.findById(username);
      log.info(profile.toString());
      if (profile.isPresent()) {
         ProfileDto guestDto = ProfileDto.fromProfile(profile.get(), true);
         guestDto.setFollow(followService.follows(jwtUsername, username));
         return guestDto;
      } else {
         throw new IllegalAccessError("username not found");
      }
   }

   public ProfileDto followUser(String followee, String follower) {
      followService.addFollowee(follower, followee);
      Optional<Profile> profile = repository.findById(followee);
      ProfileDto guestDto = ProfileDto.fromProfile(profile.get(), true);
      guestDto.setFollow(true);
      return guestDto;
   }

   public ProfileDto unfollowUser(String followee, String follower) {
      followService.deleteFollowee(follower, followee);
      Optional<Profile> profile = repository.findById(followee);
      ProfileDto guestDto = ProfileDto.fromProfile(profile.get(), true);
      guestDto.setFollow(false);
      return guestDto;
   }

}
