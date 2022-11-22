package com.mohamed.halim.essa.askclone.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder(toBuilder = true)
@EqualsAndHashCode(exclude = { "answer" })

public class Question {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private Long mainQuestionId;
   @ManyToOne
   private Profile from;
   @ManyToOne
   private Profile to;
   private Date date;
   private String question;
   @OneToOne
   @JoinColumn(name = "answer_id", referencedColumnName = "id")
   @ToString.Exclude
   private Answer answer;
}
