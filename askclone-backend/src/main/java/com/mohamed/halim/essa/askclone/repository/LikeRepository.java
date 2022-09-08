package com.mohamed.halim.essa.askclone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mohamed.halim.essa.askclone.model.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
   @Query("SELECT l FROM Like l WHERE l.answer.id = :id")
   List<Like> findAnswerLikes(@Param("id") Long id);

   @Modifying
   @Query("DELETE FROM Like l WHERE l.answer.id = :id AND l.from.username = :username")
   void deleteLikeByAnswerAndUser(@Param("id") Long id, @Param("username") String username);

}
