package com.mohamed.halim.essa.askclone.controller;

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
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

   @PostMapping("/add/tolist")
   public ResponseEntity<Object> addQuestionToList(HttpServletRequest request,
         @RequestBody ObjectNode json)
         throws IllegalAccessException, JsonMappingException, JsonProcessingException {
      String username = JwtUtils.extractUsername(request);
      QuestionDto question = new ObjectMapper().treeToValue(json.get("question"),
            QuestionDto.class);
      log.info(json.get("question").toString());
      String[] users = new ObjectMapper().treeToValue(json.get("to"),
            String[].class);
      service.addQuestion(question, username, users);
      return ResponseEntity.ok().build();
   }

   @PostMapping("/add/followup")
   public ResponseEntity<Object> addQuestionFollowUp(HttpServletRequest request, @RequestBody QuestionDto question)
         throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      service.addQuestionFollowUp(question, username);
      return ResponseEntity.ok().build();
   }

   @GetMapping
   public ResponseEntity<Object> getAllQuestions(HttpServletRequest request, @RequestParam int page)
         throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      List<QuestionDto> questions = service.getAllQuestions(username, page);
      return ResponseEntity.ok().body(questions);
   }

   @GetMapping("/{id}")
   public ResponseEntity<Object> getQuestionById(HttpServletRequest request, @PathVariable long id)
         throws IllegalAccessException {

      String username = JwtUtils.extractUsername(request);
      QuestionDto question = service.getQuestionById(id);
      if (question.getTo().equals(username)) {
         return ResponseEntity.ok().body(question);
      }
      return ResponseEntity.notFound().build();
   }

   @DeleteMapping("/delete/{id}")
   public ResponseEntity<Object> deleteQuestion(HttpServletRequest request, @PathVariable String id) {
      service.deleteQuestion(Long.parseLong(id));
      return ResponseEntity.ok().build();
   }

   @DeleteMapping("/delete")
   public ResponseEntity<Object> deleteAllQuestions(HttpServletRequest request) throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      service.deleteAllQuestions(username);
      return ResponseEntity.ok().build();
   }

}
