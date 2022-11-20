package com.mohamed.halim.essa.askclone.model.dto;

import java.util.stream.Collectors;

import com.mohamed.halim.essa.askclone.model.Gender;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Status;
import com.mohamed.halim.essa.askclone.utils.DateUtils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
   private boolean guest;
   private String username;
   private String fullname;
   private boolean status;
   private String location;
   private String bio;
   private String links;
   private int day;
   private int month;
   private int year;
   private String gender;
   private int postsCount;
   private boolean allowAnoymousQuestions;
   private String profileImageUrl;
   private String coverImageUrl;
   private int followersCount;
   private int likesCount;
   private boolean follow;
   private int unReadNotifications;

   public static ProfileDto fromProfile(Profile profile) {
      ProfileDto dto = ProfileDto.builder()
            .username(profile.getUsername())
            .fullname(profile.getDisplayname())
            .status(profile.getStatus() == Status.ONLINE)
            .location(profile.getLocation())
            .bio(profile.getBio())
            .links(profile.getLinks())
            .allowAnoymousQuestions(profile.isAllowAnoymousQuestions())
            .profileImageUrl(profile.getProfilePictureUrl())
            .coverImageUrl(profile.getCoverPictureUrl())
            .likesCount(profile.getLikes().size())
            .postsCount(
                  profile.getAnswers().stream().filter(q -> q.getAnswer() == null).collect(Collectors.toList()).size())
            .followersCount(profile.getFollowers().size())
            .day(DateUtils.getDay(profile.getBirthday()))
            .month(DateUtils.getMonth(profile.getBirthday()))
            .year(DateUtils.getYear(profile.getBirthday()))
            .gender(profile.getGender().toString())
            .unReadNotifications(
                  profile.getNotifications().stream().filter(n -> !n.isRead()).collect(Collectors.toList()).size())
            .build();
      return dto;

   }

   public static ProfileDto fromProfileAsGuest(Profile profile) {
      ProfileDto dto = ProfileDto.builder()
            .guest(true)
            .username(profile.getUsername())
            .fullname(profile.getDisplayname())
            .status(profile.getStatus() == Status.ONLINE)
            .location(profile.getLocation())
            .bio(profile.getBio())
            .links(profile.getLinks())
            .allowAnoymousQuestions(profile.isAllowAnoymousQuestions())
            .profileImageUrl(profile.getProfilePictureUrl())
            .coverImageUrl(profile.getCoverPictureUrl())
            .likesCount(profile.getLikes().size())
            .postsCount(
                  profile.getAnswers().stream().filter(q -> q.getAnswer() == null).collect(Collectors.toList()).size())
            .build();

      return dto;
   }

   public static Profile fromProfileDto(ProfileDto profile) {
      return Profile.builder()
            .username(profile.getUsername())
            .displayname(profile.getFullname())
            .status(profile.isStatus() ? Status.ONLINE : Status.INVISIBLE)
            .location(profile.getLocation())
            .bio(profile.getBio())
            .links(profile.getLinks())
            .birthday(DateUtils.getDateFromFields(profile.day, profile.month, profile.year))
            .gender(Gender.valueOf(profile.getGender()))
            .allowAnoymousQuestions(profile.isAllowAnoymousQuestions())
            .profilePictureUrl(profile.getProfileImageUrl())
            .coverPictureUrl(profile.getCoverImageUrl())
            .build();
   }

   public static Profile updateProfile(ProfileDto profileDto, Profile profile) {
      return profile.toBuilder()
            .username(profileDto.getUsername())
            .displayname(profileDto.getFullname())
            .status(profileDto.isStatus() ? Status.ONLINE : Status.INVISIBLE)
            .location(profileDto.getLocation())
            .bio(profileDto.getBio())
            .links(profileDto.getLinks())
            .birthday(DateUtils.getDateFromFields(profileDto.day, profileDto.month, profileDto.year))
            .gender(Gender.valueOf(profileDto.getGender()))
            .allowAnoymousQuestions(profileDto.isAllowAnoymousQuestions())
            .profilePictureUrl(profileDto.getProfileImageUrl())
            .coverPictureUrl(profileDto.getCoverImageUrl())
            .build();
   }

}
