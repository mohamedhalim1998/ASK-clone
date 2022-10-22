package com.mohamed.halim.essa.askclone.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mohamed.halim.essa.askclone.model.dto.FriendDto;
import com.mohamed.halim.essa.askclone.services.ProfileService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

@RestController
@RequestMapping("/friends")
public class FriendController {

   private ProfileService service;

   public FriendController(ProfileService service) {
      this.service = service;
   }

   @GetMapping
   public List<FriendDto> getAllFriends(HttpServletRequest request) throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      return service.getFriends(username);
   }

}
