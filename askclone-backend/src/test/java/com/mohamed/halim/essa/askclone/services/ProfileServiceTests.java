package com.mohamed.halim.essa.askclone.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.mohamed.halim.essa.askclone.model.AppUser;
import com.mohamed.halim.essa.askclone.model.Gender;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Status;
import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.repository.ProfileRepository;
import com.mohamed.halim.essa.askclone.utils.DateUtils;

import org.junit.jupiter.api.TestInstance;

@ExtendWith(MockitoExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ProfileServiceTests {
   Profile profile;
   ProfileDto dto;
   Date date;

   @BeforeAll
   public void setup() {
      date = new Date();
      profile = Profile.builder()
            .username("username")
            .allowAnoymousQuestions(true)
            .bio("bio")
            .birthday(date)
            .coverPictureUrl("coverPictureUrl")
            .status(Status.INVISIBLE)
            .gender(Gender.MALE)
            .build();
      dto = ProfileDto.builder()
            .username("username")
            .allowAnoymousQuestions(true)
            .bio("bio")
            .day(DateUtils.getDay(profile.getBirthday()))
            .month(DateUtils.getMonth(profile.getBirthday()))
            .year(DateUtils.getYear(profile.getBirthday()))
            .coverImageUrl("coverPictureUrl")
            .status(false)
            .gender(Gender.MALE.toString())
            .build();

   }

   @Mock
   private ProfileRepository repository;

   @InjectMocks
   private ProfileService service;

   @Test
   public void test_updateuser() throws IllegalStateException, IOException {
      when(repository.findById(anyString())).thenReturn(Optional.of(profile));
      service.updateProfile(dto, null, null);
      Mockito.verify(repository).findById(anyString());
      Mockito.verify(repository).save(any());
   }

   @Test
   public void test_saveuser() {
      AppUser appUser = new AppUser();
      appUser.setUsername("username");
      service.save(appUser);

      Mockito.verify(repository).save(any(Profile.class));
   }

   @Test
   public void test_getuser() {
      when(repository.findById(anyString())).thenReturn(Optional.of(profile));
      service.getProfile("username");
      Mockito.verify(repository).findById(anyString());

   }

}