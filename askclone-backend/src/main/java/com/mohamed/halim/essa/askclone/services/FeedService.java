package com.mohamed.halim.essa.askclone.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.dto.AnswerDto;
import com.mohamed.halim.essa.askclone.repository.AnswerRepository;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FeedService {
   private AnswerRepository answerRepository;
   private ProfileRepository profileRepository;

   public FeedService(AnswerRepository answerRepository, ProfileRepository profileRepository) {
      this.answerRepository = answerRepository;
      this.profileRepository = profileRepository;
   }

   public List<AnswerDto> getUserFeed(String username) {
      Profile profile = profileRepository.findById(username).get();
      List<String> followees = profile.getFollowees().stream().map(f -> f.getFollower())
            .collect(Collectors.toList());
      log.info(followees.toString());
      log.info(profile.getFollowers().toString());
      return AnswerDto.fromAnswerList(answerRepository.findFolloweesAnswers(followees));
   }

   public List<AnswerDto> getUserAnswers(String username) {
      return AnswerDto.fromAnswerList(answerRepository.findAnswersByUsername(username));
   }

}
