package com.mohamed.halim.essa.askclone.services;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProfileService {
   private ProfileRepository repository;
   private ImageService imageService;

   public ProfileService(ProfileRepository repository, ImageService imageService) {
      this.imageService = imageService;
      this.repository = repository;
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
         return ProfileDto.fromProfile(profile.get());
      } else {
         throw new IllegalAccessError("username not found");
      }
   }

}
