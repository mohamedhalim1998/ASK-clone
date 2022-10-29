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
   private long id;
   private String to;
   private String toFullName;
   private String toProfileImage;
   private long date;
   private String question;
   private String answer;
   private String answerImage;
   private String from;
   private String fromFullName;
   private String fromProfileImage;
   private Long mainQuestionId;

   public static QuestionDto fromQuestion(Question question) {
      return QuestionDto.builder()
            .id(question.getId())
            .anonymously(question.getFrom() == null)
            .to(question.getTo().getUsername())
            .toFullName(question.getTo().getDisplayname())
            .toProfileImage(question.getTo().getProfilePictureUrl())
            .date(DateUtils.dateToLong(question.getDate()))
            .question(question.getQuestion())
            .from(question.getFrom() != null ? question.getFrom().getUsername() : null)
            .fromFullName(question.getFrom() != null ? question.getFrom().getDisplayname() : null)
            .fromProfileImage(question.getFrom() != null ? question.getFrom().getProfilePictureUrl() : null)
            .mainQuestionId(question.getMainQuestionId())
            .build();
   }

   public static List<QuestionDto> fromQuestionList(List<Question> questions) {
      return questions.stream().map(QuestionDto::fromQuestion).collect(Collectors.toList());
   }

   public static Question updateQuestion(Question question, QuestionDto dto, Profile from, Profile to) {
      QuestionBuilder builder = question.toBuilder();
      builder.from(from).to(to).date(new Date(dto.getDate())).question(dto.question);
      return builder.build();
   }

   public static Question toQuestion(QuestionDto dto, Profile from, Profile to) {
      QuestionBuilder builder = Question.builder();
      builder.from(from).to(to).date(new Date(dto.getDate())).question(dto.question).mainQuestionId(dto.mainQuestionId);
      return builder.build();
   }

}
