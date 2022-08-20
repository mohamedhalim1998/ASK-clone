package com.mohamed.halim.essa.askclone.model.dto;

import java.util.Date;

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
   private String to;
   private long date;
   private String question;
   private String answer;
   private int likes;

   public static QuestionDto fromQuestion(Question question) {
      return QuestionDto.builder()
            .anonymously(question.getFrom() != null)
            .to(question.getTo().getUsername())
            .date(DateUtils.dateToLong(question.getDate()))
            .question(question.getQuestion())
            .answer(question.getAnswer())
            .likes(question.getLikes().size())
            .build();

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
