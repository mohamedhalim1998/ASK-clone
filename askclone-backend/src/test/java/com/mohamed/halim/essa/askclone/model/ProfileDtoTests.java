package com.mohamed.halim.essa.askclone.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.utils.DateUtils;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ProfileDtoTests {
   Profile profile;
   ProfileDto dto;
   Date date;

   @BeforeAll
   public void setup() {
      date = new Date();
      profile = Profile.builder()
            .allowAnoymousQuestions(true)
            .bio("bio")
            .birthday(date)
            .coverPictureUrl("coverPictureUrl")
            .status(Status.INVISIBLE)
            .gender(Gender.MALE)
            .build();
      dto = ProfileDto.builder()
            .allowAnoymousQuestions(true)
            .bio("bio")
            .day(DateUtils.getDay(profile.getBirthday()))
            .month(DateUtils.getMonth(profile.getBirthday()))
            .year(DateUtils.getYear(profile.getBirthday())).coverImageUrl("coverPictureUrl")
            .status(false)
            .gender(Gender.MALE.toString())
            .build();

   }

   @Test
   public void test_profileToDto() {
      ProfileDto profileDto = ProfileDto.fromProfile(profile, false);
      assertEquals(dto, profileDto);
   }

   @Test
   public void test_dtoToProfile() {
      Profile p = ProfileDto.fromProfileDto(dto);
      assertEquals(profile, p);
   }

   @Test
   public void test_updatePrifile() {
      Profile p = new Profile();
      p.setUsername("user1");
      p = ProfileDto.updateProfile(dto, p);
      assertEquals(p.getUsername(), profile.getUsername());
   }
}
