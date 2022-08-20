package com.mohamed.halim.essa.askclone.services;

import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.dto.QuestionDto;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.QuestionRepository;

@Service
public class QuestionService {
   private QuestionRepository questionRepository;
   private ProfileRepository profileRepository;

   public QuestionService(QuestionRepository questionRepository, ProfileRepository profileRepository) {
      this.questionRepository = questionRepository;
      this.profileRepository = profileRepository;
   }

   public void addQuestion(QuestionDto question, String username) {
      question.setDate(System.currentTimeMillis());
      Profile to = profileRepository.findById(question.getTo()).get();
      Profile from = null;
      if (!question.isAnonymously()) {
         from = profileRepository.findById(username).get();
      }
      questionRepository.save(QuestionDto.toQuestion(question, from, to));
   }

}
