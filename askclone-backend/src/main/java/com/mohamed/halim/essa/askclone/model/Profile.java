package com.mohamed.halim.essa.askclone.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder(toBuilder = true)
public class Profile {
   @Id
   private String username;
   @OneToOne
   @JoinColumn(name = "username", referencedColumnName = "username")
   private AppUser user;
   private String displayname;
   @Enumerated(EnumType.STRING)
   @Builder.Default
   private Status status = Status.ONLINE;
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "to")
   @Builder.Default
   @ToString.Exclude
   private List<Question> answers = List.of();
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "to")
   @Builder.Default
   @ToString.Exclude
   private List<Like> likes = List.of();
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "followee")
   @Builder.Default
   @ToString.Exclude
   private List<Follow> followers = List.of();
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "follower")
   @Builder.Default
   @ToString.Exclude
   private List<Follow> followees = List.of();
   private String location;
   private String bio;
   private String links;
   private Date birthday;
   @Enumerated(EnumType.STRING)
   @Builder.Default
   private Gender gender = Gender.MALE;
   private boolean allowAnoymousQuestions;
   @Builder.Default
   private String profilePictureUrl = "blank-profile-pic.png";
   private String coverPictureUrl;
   @OneToMany(cascade = CascadeType.ALL, mappedBy = "to")
   @ToString.Exclude
   @Builder.Default
   private List<Notification> notifications = List.of();
   @Builder.Default
   private boolean showFriendsLikes = false;
}
