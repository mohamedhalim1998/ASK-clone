package com.mohamed.halim.essa.askclone.services;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.model.Follow;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Status;
import com.mohamed.halim.essa.askclone.model.dto.GuestDto;
import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.repository.FollowRepository;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProfileService {
   private ProfileRepository repository;
   private FollowRepository followerRepository;
   private ImageService imageService;

   public ProfileService(ProfileRepository repository, ImageService imageService,
         FollowRepository followerRepository) {
      this.imageService = imageService;
      this.repository = repository;
      this.followerRepository = followerRepository;
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

   public void updateStatus(String username, boolean status) {
      repository.findById(username).ifPresentOrElse((profile) -> {
         profile.setStatus(status ? Status.ONLINE : Status.INVISIBLE);
         repository.save(profile);
      }, () -> {
         throw new IllegalAccessError("username not found");
      });
   }

   public GuestDto getGuest(String username, String jwtUsername) {
      Optional<Profile> profile = repository.findById(username);
      log.info(profile.toString());
      if (profile.isPresent()) {
         GuestDto guestDto = GuestDto.fromProfile(profile.get());
         Optional<Profile> follower = repository.findById(jwtUsername);
         Optional<Profile> followee = repository.findById(username);
         Optional<Follow> followerRelation = followerRepository.findByFollower(followee.get(), follower.get());
         guestDto.setFollow(followerRelation.isPresent());
         return guestDto;
      } else {
         throw new IllegalAccessError("username not found");
      }
   }

   public GuestDto changeFollow(String username, String jwtUsername, boolean follow) {
      Optional<Profile> follower = repository.findById(jwtUsername);
      Optional<Profile> followee = repository.findById(username);
      if (follower.isPresent() && followee.isPresent()) {
         if (follow) {
            Follow followerRelation = Follow.builder().follower(follower.get()).followee(followee.get()).build();
            follower.get().getFollowees().add(followerRelation);
            repository.save(follower.get());
         } else {
            Optional<Follow> followerRelation = followerRepository.findByFollower(followee.get(), follower.get());
            log.info(followerRelation.toString());
            followerRepository.deleteById(followerRelation.get().getId());
         }
         GuestDto guestDto = GuestDto.fromProfile(followee.get());
         guestDto.setFollow(follow);
         return guestDto;
      } else {
         throw new IllegalAccessError("username not found");
      }

   }

}
