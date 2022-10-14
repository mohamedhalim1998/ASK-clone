package com.mohamed.halim.essa.askclone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mohamed.halim.essa.askclone.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

   @Query("SELECT n FROM Notification n WHERE n.to.username = :username AND n.read = FALSE ORDER BY n.date DESC")
   List<Notification> findUnreadNotificationByUsername(@Param("username") String username);

   @Query("SELECT n FROM Notification n WHERE n.to.username = :username ORDER BY n.date DESC")
   List<Notification> findAllNotificationByUsername(@Param("username") String username);
}
