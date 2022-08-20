package com.mohamed.halim.essa.askclone.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.model.Follow;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.repository.FollowRepository;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.UserRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class InitialTestData implements CommandLineRunner {

   private UserRepository userRepository;
   private ProfileRepository profileRepository;
   private FollowRepository followRepository;

   @Override
   public void run(String... args) throws Exception {
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      insertUser("user1", passwordEncoder.encode("123"), "a@a.com");
      insertUser("user2", passwordEncoder.encode("123"), "a@e.com");
      followRepository.save(Follow.builder().follower("user2").followee("user1").build());
   }

   private void insertUser(String username, String pass, String email) {
      AppUser user = new AppUser();
      user.setUsername(username);
      user.setPassword(pass);
      user.setEmail(email);
      userRepository.save(user);
      Profile profile = Profile.builder().username(username).build();
      profileRepository.save(profile);
   }

}
