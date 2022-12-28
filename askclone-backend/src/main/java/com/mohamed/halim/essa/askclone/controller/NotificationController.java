package com.mohamed.halim.essa.askclone.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mohamed.halim.essa.askclone.model.dto.NotificationDto;
import com.mohamed.halim.essa.askclone.services.NotificationService;
import com.mohamed.halim.essa.askclone.utils.JwtUtils;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/notification")
@Slf4j
public class NotificationController {
   private NotificationService service;

   public NotificationController(NotificationService service) {
      this.service = service;
   }

   @PostMapping
   public void markAllAsRead(HttpServletRequest request, @PathVariable(required = false) Long id)
         throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      service.markAllAsRead(username);

   }

   @GetMapping
   public List<NotificationDto> getAllUserNotifications(HttpServletRequest request,
         @PathVariable(required = false) Long id,
         @RequestParam int page)
         throws IllegalAccessException {
      String username = JwtUtils.extractUsername(request);
      log.info(username + " : " + page);
      return service.getAllNotifications(username, page);
   }

}
