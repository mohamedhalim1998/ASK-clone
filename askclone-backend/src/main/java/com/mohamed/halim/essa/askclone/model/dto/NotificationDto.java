package com.mohamed.halim.essa.askclone.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.mohamed.halim.essa.askclone.model.Notification;
import com.mohamed.halim.essa.askclone.model.NotificationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class NotificationDto {
   private long id;
   private String from;
   private String fromFullName;
   private String fromProfileImage;
   private String to;
   private boolean read;
   private String type;
   private long date;
   private Long questionId;
   private Long answerId;
   private String questionText;

   public static NotificationDto fromNotification(Notification notification) {
      NotificationDto dto = NotificationDto.builder()
            .id(notification.getId())
            .from(notification.getFrom() != null ? notification.getFrom().getUsername() : null)
            .fromFullName(notification.getFrom() != null ? notification.getFrom().getDisplayname() : null)
            .fromProfileImage(notification.getFrom() != null ? notification.getFrom().getProfilePictureUrl() : null)
            .to(notification.getTo().getUsername())
            .type(notification.getNotificationType().toString())
            .read(notification.isRead())
            .date(notification.getDate().getTime())
            .questionText(notification.getQuestion().getQuestion())
            .build();
      if (notification.getNotificationType() == NotificationType.QUESTION) {
         dto.setQuestionId(notification.getQuestion().getId());
      } else {
         dto.setAnswerId(notification.getQuestion().getAnswer().getId());
      }
      return dto;
   }

   public static List<NotificationDto> fromNotificationList(List<Notification> likes) {
      return likes.stream().map(NotificationDto::fromNotification).collect(Collectors.toList());
   }
}
