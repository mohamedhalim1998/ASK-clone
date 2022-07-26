package com.mohamed.halim.essa.askclone.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class Profile {
   @Column(name = "profile_username")
   @Id
   private String username;
   @OneToOne
   @JoinColumn(name = "profile_username", referencedColumnName = "username")
   private AppUser user;
   private String displayname;
   @Enumerated(EnumType.STRING)
   private Status status;
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "to")
   private List<Answer> answers;
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "follower")
   private List<Follower> followers;
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "followee")
   private List<Follower> followees;
   private String location;
   private String bio;
   private String links;
   private Date birthday;
   @Enumerated(EnumType.STRING)
   private Gender gender;
   @Column(columnDefinition = "boolean default true")
   private boolean allowAnoymousQuestions;
   private String profilePictureUrl;
   private String coverPictureUrl;
}
