package com.mohamed.halim.essa.askclone.services;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.dto.QuestionDto;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.QuestionRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FeedService {
   private QuestionRepository questionRepository;
   private ProfileRepository profileRepository;

   public FeedService(QuestionRepository questionRepository, ProfileRepository profileRepository) {
      this.questionRepository = questionRepository;
      this.profileRepository = profileRepository;
   }

   public List<QuestionDto> getUserFeed(String username) {
      Profile profile = profileRepository.findById(username).get();
      List<String> followees = profile.getFollowees().stream().map(f -> f.getFollower())
            .collect(Collectors.toList());
      log.info(followees.toString());
      log.info(profile.getFollowers().toString());
      return QuestionDto.fromQuestionList(questionRepository.findFolloweesAnswers(followees));
   }

}
