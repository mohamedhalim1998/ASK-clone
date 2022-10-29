package com.mohamed.halim.essa.askclone.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.mohamed.halim.essa.askclone.model.Answer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDto {
   private long id;
   private String answer;
   private String answerImage;
   private long date;
   private QuestionDto question;
   private List<LikeDto> likes;
   @Builder.Default
   private int followQuestionConuter = 0;

   public static AnswerDto fromAnswer(Answer answer) {
      return AnswerDto.builder()
            .answer(answer.getAnswer())
            .answerImage(answer.getAnswerImage())
            .id(answer.getId())
            .date(answer.getDate().getTime())
            .question(QuestionDto.fromQuestion(answer.getQuestion()))
            .likes(LikeDto.fromLikesList(answer.getLikes()))
            .build();
   }

   public static AnswerDto fromAnswer(Answer answer, int followQuestionConuter) {
      return AnswerDto.builder()
            .answer(answer.getAnswer())
            .answerImage(answer.getAnswerImage())
            .id(answer.getId())
            .date(answer.getDate().getTime())
            .question(QuestionDto.fromQuestion(answer.getQuestion()))
            .likes(LikeDto.fromLikesList(answer.getLikes()))
            .followQuestionConuter(followQuestionConuter)
            .build();
   }

   public static List<AnswerDto> fromAnswerList(List<Answer> answers) {
      return answers.stream().map(AnswerDto::fromAnswer).collect(Collectors.toList());
   }

}
