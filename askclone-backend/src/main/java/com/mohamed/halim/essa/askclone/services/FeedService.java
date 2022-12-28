package com.mohamed.halim.essa.askclone.services;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Answer;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.dto.AnswerDto;
import com.mohamed.halim.essa.askclone.repository.AnswerRepository;
import com.mohamed.halim.essa.askclone.repository.LikeRepository;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.QuestionRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FeedService {
   private AnswerRepository answerRepository;
   private QuestionRepository questionRepository;
   private ProfileRepository profileRepository;
   private LikeRepository likeRepository;

   public FeedService(AnswerRepository answerRepository, ProfileRepository profileRepository,
         QuestionRepository questionRepository, LikeRepository likeRepository) {
      this.answerRepository = answerRepository;
      this.profileRepository = profileRepository;
      this.questionRepository = questionRepository;
      this.likeRepository = likeRepository;
   }

   public List<AnswerDto> getUserFeed(String username, int page) {
      Profile profile = profileRepository.findById(username).get();
      List<String> followees = profile.getFollowees().stream().map(f -> f.getFollowee())
            .collect(Collectors.toList());
      log.info(followees.toString());
      log.info(profile.getFollowers().toString());

      List<Answer> answers = answerRepository.findFolloweesAnswers(followees);
      if (profile.isShowFriendsLikes()) {
         answers.addAll(likeRepository.findAnswerLikedByUsers(followees).stream().collect(Collectors.toSet()));
         Collections.sort(answers, new Comparator<Answer>() {

            @Override
            public int compare(Answer a1, Answer a2) {
               return a2.getDate().compareTo(a1.getDate());
            }

         });
      }
      List<AnswerDto> dtos = answers.stream().map(this::mapToDto).collect(Collectors.toList());
      return dtos.subList(Math.min(page * 20, dtos.size()), Math.min(page * 20 + 20, dtos.size()));
   }

   public List<AnswerDto> getUserAnswers(String username, int page) {
      return answerRepository.findAnswersByUsername(username, PageRequest.of(page, 20)).stream().map(this::mapToDto)
            .collect(Collectors.toList());
   }

   public AnswerDto mapToDto(Answer answer) {
      return AnswerDto.fromAnswer(answer,
            questionRepository.findFollowUpQuestion(answer.getQuestion().getMainQuestionId()).size());

   }

}
