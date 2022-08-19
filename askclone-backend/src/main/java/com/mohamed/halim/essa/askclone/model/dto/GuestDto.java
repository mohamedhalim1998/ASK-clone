package com.mohamed.halim.essa.askclone.model.dto;

import com.mohamed.halim.essa.askclone.model.Profile;

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
public class GuestDto {
   private String username;
   private String fullname;
   private String location;
   private String bio;
   private String links;
   private String profileImageUrl;
   private String coverImageUrl;
   private int likesCount;
   private int postsCount;
   private boolean follow;

   public static GuestDto fromProfile(Profile profile) {
      GuestDto dto = GuestDto.builder()
            .username(profile.getUsername())
            .fullname(profile.getDisplayname())
            .location(profile.getLocation())
            .bio(profile.getBio())
            .links(profile.getLinks())
            .profileImageUrl(profile.getProfilePictureUrl())
            .coverImageUrl(profile.getCoverPictureUrl())
            .likesCount(profile.getLikes().size())
            .postsCount(profile.getAnswers().size())
            .build();
      log.error(dto.toString());
      return dto;
   }
}
