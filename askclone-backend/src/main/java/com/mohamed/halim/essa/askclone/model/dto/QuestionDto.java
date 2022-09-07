package com.mohamed.halim.essa.askclone.model.dto;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Question;
import com.mohamed.halim.essa.askclone.model.Question.QuestionBuilder;
import com.mohamed.halim.essa.askclone.utils.DateUtils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionDto {
   private boolean anonymously;
   private String id;
   private String to;
   private String toProfileImage;
   private long date;
   private String question;
   private String answer;
   private int likes;
   private String from;
   private String fromUsername;
   private String fromProfileImage;

   public static QuestionDto fromQuestion(Question question) {
      return QuestionDto.builder()
            .id(question.getId().toString())
            .anonymously(question.getFrom() == null)
            .to(question.getTo().getUsername())
            .toProfileImage(question.getTo().getProfilePictureUrl())
            .date(DateUtils.dateToLong(question.getDate()))
            .question(question.getQuestion())
            .answer(question.getAnswer())
            .likes(question.getLikes().size())
            .from(question.getFrom() != null ? question.getFrom().getDisplayname() : null)
            .fromUsername(question.getFrom() != null ? question.getFrom().getUsername() : null)
            .fromProfileImage(question.getFrom() != null ? question.getFrom().getProfilePictureUrl() : null)
            .build();
   }

   public static List<QuestionDto> fromQuestionList(List<Question> questions) {
      return questions.stream().map(QuestionDto::fromQuestion).collect(Collectors.toList());
   }

   public static Question updateQuestion(Question question, QuestionDto dto, Profile from, Profile to) {
      QuestionBuilder builder = question.toBuilder();
      builder.from(from).to(to).answer(dto.getAnswer()).date(new Date(dto.getDate())).question(dto.question);
      return builder.build();
   }

   public static Question toQuestion(QuestionDto dto, Profile from, Profile to) {
      QuestionBuilder builder = Question.builder();
      builder.from(from).to(to).answer(dto.getAnswer()).date(new Date(dto.getDate())).question(dto.question);
      return builder.build();
   }

}
