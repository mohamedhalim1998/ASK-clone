package com.mohamed.halim.essa.askclone.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mohamed.halim.essa.askclone.model.dto.AnswerDto;
import com.mohamed.halim.essa.askclone.services.AnswerService;

@RestController
@RequestMapping("/answer")
public class AnswerController {
   private AnswerService answerService;

   public AnswerController(AnswerService answerService) {
      this.answerService = answerService;
   }

   @PostMapping
   public ResponseEntity<Object> addAnswer(HttpServletRequest request,
         @RequestPart("answer") AnswerDto answer,
         @RequestPart(required = false, name = "answerImage") MultipartFile answerImage)
         throws IllegalAccessException, NumberFormatException, IllegalStateException, IOException {
      answerService.addAnswer(answer, answerImage);
      return ResponseEntity.ok().build();
   }

   @GetMapping("/{id}")
   public ResponseEntity<AnswerDto> getAnswer(@PathVariable long id) {
      return ResponseEntity.ok(answerService.getAnswer(id));
   }


}
