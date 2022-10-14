package com.mohamed.halim.essa.askclone.services;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Answer;
import com.mohamed.halim.essa.askclone.model.Like;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.dto.LikeDto;
import com.mohamed.halim.essa.askclone.repository.AnswerRepository;
import com.mohamed.halim.essa.askclone.repository.LikeRepository;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LikeService {
   private LikeRepository likeRepository;
   private ProfileRepository profileRepository;
   private AnswerRepository answerRepository;
   private NotificationService notificationService;

   public LikeService(LikeRepository likeRepository, ProfileRepository profileRepository,
         AnswerRepository answerRepository, NotificationService notificationService) {
      this.likeRepository = likeRepository;
      this.profileRepository = profileRepository;
      this.answerRepository = answerRepository;
      this.notificationService = notificationService;
   }

   public void addLike(String username, LikeDto dto) {
      log.info(username);
      log.info(dto.toString());
      Profile from = profileRepository.findById(username).get();
      Answer answer = answerRepository.findById(dto.getAnswerId()).get();
      Like like = Like.builder().from(from).answer(answer).to(answer.getFrom()).build();
      likeRepository.save(like);
      notificationService.sendLikeNotification(from, answer.getQuestion().getTo(), answer.getQuestion());
   }

   @Transactional
   public void deleteLike(String username, LikeDto like) {
      likeRepository.deleteLikeByAnswerAndUser(like.getAnswerId(), username);
   }

}
