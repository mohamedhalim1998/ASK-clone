package com.mohamed.halim.essa.askclone.config;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.model.Follow;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Question;
import com.mohamed.halim.essa.askclone.repository.FollowRepository;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.QuestionRepository;
import com.mohamed.halim.essa.askclone.repository.UserRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class InitialTestData implements CommandLineRunner {

   private UserRepository userRepository;
   private ProfileRepository profileRepository;
   private FollowRepository followRepository;
   private QuestionRepository questionRepository;

   @Override
   public void run(String... args) throws Exception {
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      Profile user1 = insertUser("user1", passwordEncoder.encode("123"), "a@a.com");
      Profile user2 = insertUser("user2", passwordEncoder.encode("123"), "a@e.com");
      followRepository.save(Follow.builder().follower("user2").followee("user1").build());
      questionRepository.save(Question.builder().date(new Date()).question("What's up dude ?").from(user1).to(user2).build());
      questionRepository.save(Question.builder().date(new Date()).question("What's up dude anonymously ?").to(user2).build());
   }

   private Profile insertUser(String username, String pass, String email) {
      AppUser user = new AppUser();
      user.setUsername(username);
      user.setPassword(pass);
      user.setEmail(email);
      userRepository.save(user);
      Profile profile = Profile.builder().username(username).displayname(username).build();
      profileRepository.save(profile);
      return profile;
   }

}