package com.mohamed.halim.essa.askclone.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
