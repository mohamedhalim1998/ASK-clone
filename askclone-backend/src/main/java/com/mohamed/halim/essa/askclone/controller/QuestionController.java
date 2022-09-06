package com.mohamed.halim.essa.askclone.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mohamed.halim.essa.askclone.model.dto.QuestionDto;
import com.mohamed.halim.essa.askclone.services.QuestionService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

@Controller
@RequestMapping("/question")
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
         @RequestBody ObjectNode objectNode) throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      service.addAnswer(Long.parseLong(id), objectNode.get("answer").asText());
      return ResponseEntity.ok().build();
   }
}
