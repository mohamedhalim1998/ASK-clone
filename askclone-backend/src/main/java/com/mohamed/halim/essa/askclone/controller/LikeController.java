package com.mohamed.halim.essa.askclone.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mohamed.halim.essa.askclone.model.dto.LikeDto;
import com.mohamed.halim.essa.askclone.services.LikeService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

@RestController
@RequestMapping("/like")
public class LikeController {
   private LikeService likeService;

   public LikeController(LikeService likeService) {
      this.likeService = likeService;
   }

   @PostMapping("/add")
   public void addLike(HttpServletRequest request, @RequestBody LikeDto like) throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      likeService.addLike(username, like);
   }

   @DeleteMapping("/delete")
   public void deleteLike(HttpServletRequest request, @RequestBody LikeDto like) throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      likeService.deleteLike(username, like);
   }

}
