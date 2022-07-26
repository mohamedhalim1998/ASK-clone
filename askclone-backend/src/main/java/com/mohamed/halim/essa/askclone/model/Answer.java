package com.mohamed.halim.essa.askclone.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class Answer {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   @ManyToOne
   private Profile from;
   @ManyToOne
   private Profile to;
   private Date date;
   private String question;
   private String answer;
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "answer")
   private List<Like> likes;
}
