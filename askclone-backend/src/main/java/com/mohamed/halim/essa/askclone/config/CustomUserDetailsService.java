package com.mohamed.halim.essa.askclone.config;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {
   @Autowired
   UserRepository userRepository;

   public CustomUserDetailsService() {
   }

   @Override
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      AppUser user = userRepository.findByUsername(username);
      System.out.println(username);
      System.out.println(user);
      if (user == null) {
         user = userRepository.findByEmail(username);
      }
      if (user == null) {
         throw new UsernameNotFoundException("User not found");
      }
      return new CustomUserDetails(user);
   }

}
