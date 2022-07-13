package com.mohamed.halim.essa.askclone.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
   @Id
   private String username;
   @Column(nullable = false, unique = true)
   private String email;
   @Column(nullable = false)
   private String password;
}
