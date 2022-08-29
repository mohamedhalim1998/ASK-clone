package com.mohamed.halim.essa.askclone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mohamed.halim.essa.askclone.model.Question;


@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
   @Query("SELECT q FROM Question q WHERE q.to.username = :username")
   List<Question> findQuestionsByUsername(@Param("username") String username);

}