package com.mohamed.halim.essa.askclone.services;

import java.util.Date;
import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Notification;
import com.mohamed.halim.essa.askclone.model.NotificationType;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Question;
import com.mohamed.halim.essa.askclone.model.dto.NotificationDto;
import com.mohamed.halim.essa.askclone.repository.NotificationRepository;

@Service
public class NotificationService {
   private NotificationRepository repository;
   private SimpMessagingTemplate messagingTemplate;

   public NotificationService(NotificationRepository repository, SimpMessagingTemplate messagingTemplate) {
      this.repository = repository;
      this.messagingTemplate = messagingTemplate;
   }

   public void markAllAsRead(String username) {
      repository.findUnreadNotificationByUsername(username)
            .forEach(n -> {
               n.setRead(true);
               repository.save(n);
            });

   }

   public void sendQuestionNotification(Profile from, Profile to, Question question) {
      Notification notification = Notification.builder()
            .notificationType(NotificationType.QUESTION)
            .to(to)
            .from(from)
            .question(question)
            .date(new Date()).build();
      saveAndSend(notification);
   }

   public void sendQuestionNotification(Profile to, Question question) {
      Notification notification = Notification.builder()
            .notificationType(NotificationType.QUESTION)
            .to(to)
            .question(question)
            .date(new Date()).build();
      saveAndSend(notification);
   }

   public void sendAnswerNotification(Profile from, Profile to, Question question) {
      Notification notification = Notification.builder()
            .notificationType(NotificationType.ANSWER)
            .to(to)
            .from(from)
            .question(question)
            .date(new Date()).build();
      saveAndSend(notification);
   }

   public void sendLikeNotification(Profile from, Profile to, Question question) {
      Notification notification = Notification.builder()
            .notificationType(NotificationType.LIKE)
            .to(to)
            .from(from)
            .question(question)
            .date(new Date()).build();
      saveAndSend(notification);
   }

   public void saveAndSend(Notification notification) {
      repository.save(notification);
      messagingTemplate.convertAndSendToUser(notification.getTo().getUsername(), "/notification",
            NotificationDto.fromNotification(notification));
   }

   public List<NotificationDto> getAllNotifications(String username) {
      return NotificationDto.fromNotificationList(repository.findAllNotificationByUsername(username));
   }

}
