package com.mohamed.halim.essa.askclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mohamed.halim.essa.askclone.model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
