package com.mohamed.halim.essa.askclone.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mohamed.halim.essa.askclone.model.dto.AnswerDto;
import com.mohamed.halim.essa.askclone.services.FeedService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

import lombok.extern.slf4j.Slf4j;

@RestController()
@RequestMapping("/feed")
@Slf4j
public class FeedController {
   private FeedService feedService;

   public FeedController(FeedService feedService) {
      this.feedService = feedService;
   }

   @GetMapping
   public ResponseEntity<List<AnswerDto>> getUserFeed(HttpServletRequest request, @RequestParam int page)
         throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      log.info("feed for: " + username);
      return ResponseEntity.ok(feedService.getUserFeed(username, page));
   }

   @GetMapping("/user/{username}")
   public ResponseEntity<List<AnswerDto>> getuserAnswers(@PathVariable String username, @RequestParam int page) {
      return ResponseEntity.ok(feedService.getUserAnswers(username, page));
   }

}
