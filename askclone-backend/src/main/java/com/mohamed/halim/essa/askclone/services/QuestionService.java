package com.mohamed.halim.essa.askclone.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Question;
import com.mohamed.halim.essa.askclone.model.dto.QuestionDto;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.QuestionRepository;

@Service
public class QuestionService {
   private QuestionRepository questionRepository;
   private ProfileRepository profileRepository;
   private NotificationService notificationService;

   public QuestionService(QuestionRepository questionRepository, ProfileRepository profileRepository,
         ImageService imageService, NotificationService notificationService) {
      this.questionRepository = questionRepository;
      this.profileRepository = profileRepository;
      this.notificationService = notificationService;
   }

   public void addQuestion(QuestionDto question, String username) {
      question.setDate(System.currentTimeMillis());
      Profile to = profileRepository.findById(question.getTo()).get();
      Profile from = null;
      if (!question.isAnonymously()) {
         from = profileRepository.findById(username).get();
      }
      Question q = questionRepository.save(QuestionDto.toQuestion(question, from, to));
      if (q.getMainQuestionId() == null) {
         q.setMainQuestionId(q.getId());
         questionRepository.save(q);
      }
      if (q.getFrom() != null) {
         notificationService.sendQuestionNotification(q.getFrom(), q.getTo(), q);
      } else {
         notificationService.sendQuestionNotification(q.getTo(), q);
      }
   }

   public List<QuestionDto> getAllQuestions(String username) {
      List<Question> questions = questionRepository.findQuestionsByUsername(username);
      return QuestionDto.fromQuestionList(questions);
   }

   public void deleteQuestion(long id) {
      questionRepository.deleteById(id);
   }

   @Transactional
   public void deleteAllQuestions(String username) {
      questionRepository.deleteAllByUsername(username);
   }

   public void addQuestionFollowUp(QuestionDto question, String username) {
      questionRepository.findById(question.getMainQuestionId()).ifPresent(q -> {
         if (q.getMainQuestionId() != null)
            question.setMainQuestionId(q.getMainQuestionId());
         addQuestion(question, username);
         questionRepository.save(q);
      });
   }

   public QuestionDto getQuestionById(long id) {
      return QuestionDto.fromQuestion(questionRepository.findById(id).get());
   }

}
