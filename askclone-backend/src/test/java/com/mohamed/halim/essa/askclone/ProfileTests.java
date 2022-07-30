package com.mohamed.halim.essa.askclone;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.repository.UserRepository;
import com.mohamed.halim.essa.askclone.services.ProfileService;

@SpringBootTest
@AutoConfigureMockMvc
// @EnableJpaRepositories
// @AutoConfigureDataJpa
// @ComponentScan("com")
public class ProfileTests {
   @Autowired
   private ProfileRepository profileRepository;
   @Autowired
   private UserRepository userRepository;
   @Autowired
   private ProfileService service;

   @Test
   public void test_addUser() {
      AppUser appUser = new AppUser();
      appUser.setUsername("username");
      appUser.setEmail("email");
      appUser.setPassword("1234");
      userRepository.save(appUser);
      service.save(appUser);
      Optional<Profile> profile = profileRepository.findById(appUser.getUsername());
      // assertNotNull(profile.get());
      // assertEquals(appUser, profile.get().getUser());
      // assertEquals(appUser.getUsername(), profile.get().getUser().getUsername());
   }

}
