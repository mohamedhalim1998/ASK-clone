package com.mohamed.halim.essa.askclone.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.mohamed.halim.essa.askclone.model.Profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FriendDto {
   private String fullname;
   private String username;
   private String profilePic;
   private boolean allowAnoymousQuestions;

   public static FriendDto fromProfile(Profile profile) {
      return FriendDto.builder()
            .fullname(profile.getDisplayname())
            .username(profile.getUsername())
            .profilePic(profile.getProfilePictureUrl())
            .allowAnoymousQuestions(profile.isAllowAnoymousQuestions())
            .build();
   }

   public static List<FriendDto> fromProfileList(List<Profile> profiles) {
      return profiles.stream().map(FriendDto::fromProfile).collect(Collectors.toList());
   }
}
