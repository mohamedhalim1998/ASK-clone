package com.mohamed.halim.essa.askclone.services;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Like;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Question;
import com.mohamed.halim.essa.askclone.model.dto.LikeDto;
import com.mohamed.halim.essa.askclone.repository.LikeRepository;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.QuestionRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LikeService {
   private LikeRepository likeRepository;
   private ProfileRepository profileRepository;
   private QuestionRepository questionRepository;
   private NotificationService notificationService;

   public LikeService(LikeRepository likeRepository, ProfileRepository profileRepository,
         QuestionRepository questionRepository, NotificationService notificationService) {
      this.likeRepository = likeRepository;
      this.profileRepository = profileRepository;
      this.questionRepository = questionRepository;
      this.notificationService = notificationService;
   }

   public void addLike(String username, LikeDto dto) {
      log.info(username);
      log.info(dto.toString());
      Profile from = profileRepository.findById(username).get();
      Question answer = questionRepository.findById(dto.getAnswerId()).get();
      Like like = Like.builder().from(from).answer(answer).to(answer.getTo()).build();
      likeRepository.save(like);
      notificationService.sendLikeNotification(from, answer.getTo(), answer);
   }

   @Transactional
   public void deleteLike(String username, LikeDto like) {
      likeRepository.deleteLikeByAnswerAndUser(like.getAnswerId(), username);
   }

}
