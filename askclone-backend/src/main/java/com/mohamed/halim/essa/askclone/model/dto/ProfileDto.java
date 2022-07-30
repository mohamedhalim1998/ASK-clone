package com.mohamed.halim.essa.askclone.model.dto;

import java.util.Date;

import com.mohamed.halim.essa.askclone.model.Gender;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Status;
import com.mohamed.halim.essa.askclone.utils.DateConverter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class ProfileDto {
   private String username;
   private String displayname;
   private String status;
   private String location;
   private String bio;
   private String links;
   private Long birthday;
   private String gender;
   private boolean allowAnoymousQuestions;
   private String profilePictureUrl;
   private String coverPictureUrl;

   public static ProfileDto fromProfile(Profile profile) {
      ProfileDto dto = ProfileDto.builder()
            .username(profile.getUsername())
            .displayname(profile.getDisplayname())
            .status(profile.getStatus().toString())
            .location(profile.getLocation())
            .bio(profile.getBio())
            .links(profile.getLinks())
            .birthday(DateConverter.dateToLong(profile.getBirthday()))
            .gender(profile.getGender().toString())
            .allowAnoymousQuestions(profile.isAllowAnoymousQuestions())
            .profilePictureUrl(profile.getProfilePictureUrl())
            .coverPictureUrl(profile.getCoverPictureUrl())
            .build();
      log.error(dto.toString());
      return dto;
   }

   public static Profile fromProfileDto(ProfileDto profile) {
      return Profile.builder()
            .username(profile.getUsername())
            .displayname(profile.getDisplayname())
            .status(Status.valueOf(profile.getStatus()))
            .location(profile.getLocation())
            .bio(profile.getBio())
            .links(profile.getLinks())
            .birthday(new Date(profile.getBirthday()))
            .gender(Gender.valueOf(profile.getGender()))
            .allowAnoymousQuestions(profile.isAllowAnoymousQuestions())
            .profilePictureUrl(profile.getProfilePictureUrl())
            .coverPictureUrl(profile.getCoverPictureUrl())
            .build();
   }

   public static Profile updateProfile(ProfileDto profileDto, Profile profile) {
      return profile.toBuilder()
            .username(profileDto.getUsername())
            .displayname(profileDto.getDisplayname())
            .status(Status.valueOf(profileDto.getStatus()))
            .location(profileDto.getLocation())
            .bio(profileDto.getBio())
            .links(profileDto.getLinks())
            .birthday(new Date(profileDto.getBirthday()))
            .gender(Gender.valueOf(profileDto.getGender()))
            .allowAnoymousQuestions(profileDto.isAllowAnoymousQuestions())
            .profilePictureUrl(profileDto.getProfilePictureUrl())
            .coverPictureUrl(profileDto.getCoverPictureUrl())
            .build();
   }

}
