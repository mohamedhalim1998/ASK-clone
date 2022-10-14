package com.mohamed.halim.essa.askclone.services;

import java.io.IOException;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mohamed.halim.essa.askclone.model.Answer;
import com.mohamed.halim.essa.askclone.model.Question;
import com.mohamed.halim.essa.askclone.model.dto.AnswerDto;
import com.mohamed.halim.essa.askclone.repository.AnswerRepository;
import com.mohamed.halim.essa.askclone.repository.QuestionRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AnswerService {
   private QuestionRepository questionRepository;
   private AnswerRepository answerRepository;
   private ImageService imageService;
   private NotificationService notificationService;

   public AnswerService(QuestionRepository questionRepository, AnswerRepository answerRepository,
         ImageService imageService, NotificationService notificationService) {
      this.questionRepository = questionRepository;
      this.answerRepository = answerRepository;
      this.imageService = imageService;
      this.notificationService = notificationService;
   }

   public void addAnswer(AnswerDto dto, MultipartFile answerImage)
         throws IllegalStateException, IOException {
      Question question = questionRepository.findById(dto.getQuestion().getId()).get();
      Answer answer = new Answer();
      answer.setAnswer(dto.getAnswer());
      answer.setQuestion(question);
      answer.setDate(new Date());
      answer.setFrom(question.getTo());
      if (answerImage != null) {
         String image = imageService.saveImage(answerImage);
         log.info(image);
         answer.setAnswerImage(image);
      }
      answer = answerRepository.save(answer);
      question.setAnswer(answer);
      questionRepository.save(question);
      notificationService.sendAnswerNotification(question.getTo(), question.getFrom(), question);
   }

   public AnswerDto getAnswer(long id) {
      return AnswerDto.fromAnswer(answerRepository.findById(id).get());
   }

}
