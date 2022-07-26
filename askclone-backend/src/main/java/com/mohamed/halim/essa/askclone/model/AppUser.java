package com.mohamed.halim.essa.askclone.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class AppUser {
   @Id
   @NotBlank
   private String username;
   @Column(nullable = false, unique = true)
   @NotBlank
   private String email;
   @NotBlank
   @Column(nullable = false)
   private String password;
}
