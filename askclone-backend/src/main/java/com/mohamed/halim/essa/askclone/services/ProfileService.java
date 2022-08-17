package com.mohamed.halim.essa.askclone.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.io.Files;
import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProfileService {
   private ProfileRepository repository;

   public ProfileService(ProfileRepository repository) {
      this.repository = repository;
   }

   public void updateProfile(ProfileDto profileDto) {
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

   public String saveImage(MultipartFile img) throws IllegalStateException, IOException {
      String name = String.format("%s.%s",
            UUID.randomUUID().toString(),
            Files.getFileExtension(img.getOriginalFilename()));
      File file = new File("img/" + name);
      img.transferTo(file.getAbsoluteFile());
      return file.getName();
   }

   public Resource loadImage(String name) throws FileNotFoundException {
      File file = new File("img/", name);
      return new InputStreamResource(new FileInputStream(file));
   }

}
