package com.mohamed.halim.essa.askclone.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mohamed.halim.essa.askclone.model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
   @Query("SELECT q FROM Question q WHERE q.to.username = :username AND q.answer = NULL ORDER BY q.date DESC")
   List<Question> findQuestionsByUsername(@Param("username") String username, Pageable pageable);

   @Modifying
   @Query("DELETE from Question q WHERE q.to.username = :username AND  q.answer = NULL")
   void deleteAllByUsername(@Param("username") String username);

   @Query("SELECT q FROM Question q WHERE q.mainQuestionId = :id AND q.answer <> NULL")
   List<Question> findFollowUpQuestion(@Param("id") Long id);

}
