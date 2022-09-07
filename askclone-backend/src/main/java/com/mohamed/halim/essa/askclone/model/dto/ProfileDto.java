package com.mohamed.halim.essa.askclone.model.dto;

import java.util.List;
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
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
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
   private List<QuestionDto> answers;
   private boolean allowAnoymousQuestions;
   private String profileImageUrl;
   private String coverImageUrl;
   private int followersCount;
   private int likesCount;

   public static ProfileDto fromProfile(Profile profile) {
      ProfileDto dto = ProfileDto.builder()
            .username(profile.getUsername())
            .fullname(profile.getDisplayname())
            .status(profile.getStatus() == Status.ONLINE)
            .location(profile.getLocation())
            .bio(profile.getBio())
            .links(profile.getLinks())
            .day(DateUtils.getDay(profile.getBirthday()))
            .month(DateUtils.getMonth(profile.getBirthday()))
            .year(DateUtils.getYear(profile.getBirthday()))
            .gender(profile.getGender().toString())
            .allowAnoymousQuestions(profile.isAllowAnoymousQuestions())
            .profileImageUrl(profile.getProfilePictureUrl())
            .coverImageUrl(profile.getCoverPictureUrl())
            .followersCount(profile.getFollowers().size())
            .likesCount(profile.getLikes().size())
            .answers(
                  profile.getAnswers().stream()
                        .filter(q -> q.getAnswer() != null)
                        .map(q -> QuestionDto.fromQuestion(q))
                        .collect(Collectors.toList()))
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
