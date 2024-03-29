package com.mohamed.halim.essa.askclone.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.mohamed.halim.essa.askclone.model.Like;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LikeDto {
   private String id;
   private String from;
   private long answerId;
   private String username;
   private String fullname;
   private String profileImage;

   public static LikeDto fromLike(Like like) {
      return LikeDto.builder()
            .id(like.getId().toString())
            .from(like.getFrom().getUsername())
            .answerId(like.getAnswer().getId())
            .username(like.getFrom().getUsername())
            .fullname(like.getFrom().getDisplayname())
            .profileImage(like.getFrom().getProfilePictureUrl())
            .build();

   }

   public static List<LikeDto> fromLikesList(List<Like> likes) {
      return likes.stream().map(LikeDto::fromLike).collect(Collectors.toList());
   }

}
