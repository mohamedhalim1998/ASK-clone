package com.mohamed.halim.essa.askclone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mohamed.halim.essa.askclone.model.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

   @Query("SELECT a FROM Answer a WHERE a.from.username IN :followees ORDER BY a.date DESC")
   List<Answer> findFolloweesAnswers(@Param("followees") List<String> followees);

   @Query("SELECT a FROM Answer a WHERE a.from.username = :username  ORDER BY a.date DESC")
   List<Answer> findAnswersByUsername(@Param("username") String username);

   @Query("SELECT a From Answer a WHERE a.question.mainQuestionId = :questionId")
   List<Answer> findAnswerWithFollowUp(@Param("questionId") long questionId);
}
