package com.mohamed.halim.essa.askclone.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mohamed.halim.essa.askclone.model.dto.QuestionDto;
import com.mohamed.halim.essa.askclone.services.QuestionService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/question")
@Slf4j
public class QuestionController {

   private QuestionService service;

   public QuestionController(QuestionService service) {
      this.service = service;
   }

   @PostMapping("/add")
   public ResponseEntity<Object> addQuestion(HttpServletRequest request, @RequestBody QuestionDto question)
         throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      service.addQuestion(question, username);
      return ResponseEntity.ok().build();
   }

   @GetMapping
   public ResponseEntity<Object> getAllQuestions(HttpServletRequest request) throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      List<QuestionDto> questions = service.getAllQuestions(username);
      return ResponseEntity.ok().body(questions);
   }

   @PostMapping("/addanswer/{id}")
   public ResponseEntity<Object> addAnswer(HttpServletRequest request, @PathVariable String id,
         @RequestPart("answer") ObjectNode answer,
         @RequestPart(required = false, name = "answerImage") MultipartFile answerImage)
         throws IllegalAccessException, NumberFormatException, IllegalStateException, IOException {
            log.error("saving image ", answerImage.getOriginalFilename());
      service.addAnswer(Long.parseLong(id), answer.get("answer").asText(), answerImage);
      return ResponseEntity.ok().build();
   }

   @DeleteMapping("/delete/{id}")
   public ResponseEntity<Object> deleteQuestion(HttpServletRequest request, @PathVariable String id) {
      service.deleteQuestion(Long.parseLong(id));
      return ResponseEntity.ok().build();
   }
}
