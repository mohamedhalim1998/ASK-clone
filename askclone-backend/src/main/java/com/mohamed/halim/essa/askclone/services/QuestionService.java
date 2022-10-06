package com.mohamed.halim.essa.askclone.services;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Question;
import com.mohamed.halim.essa.askclone.model.dto.QuestionDto;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.QuestionRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class QuestionService {
   private QuestionRepository questionRepository;
   private ProfileRepository profileRepository;
   private ImageService imageService;
   private NotificationService notificationService;

   public QuestionService(QuestionRepository questionRepository, ProfileRepository profileRepository,
         ImageService imageService, NotificationService notificationService) {
      this.questionRepository = questionRepository;
      this.profileRepository = profileRepository;
      this.imageService = imageService;
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

   public void addAnswer(long id, String answer, MultipartFile answerImage) throws IllegalStateException, IOException {
      Question question = questionRepository.findById(id).get();
      question.setAnswer(answer);
      question.setDate(new Date());
      if (answerImage != null) {
         String image = imageService.saveImage(answerImage);
         log.info(image);
         question.setAnswerImage(image);
      }
      questionRepository.save(question);
      notificationService.sendAnswerNotification(question.getTo(), question.getFrom(), question);
   }

   public void deleteQuestion(long id) {
      questionRepository.deleteById(id);
   }

   @Transactional
   public void deleteAllQuestions(String username) {
      questionRepository.deleteAllByUsername(username);
   }

}
