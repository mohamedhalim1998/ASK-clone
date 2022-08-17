package com.mohamed.halim.essa.askclone.controller;

import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.doNothing;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohamed.halim.essa.askclone.model.Gender;
import com.mohamed.halim.essa.askclone.model.Profile;
import com.mohamed.halim.essa.askclone.model.Status;
import com.mohamed.halim.essa.askclone.model.dto.ProfileDto;
import com.mohamed.halim.essa.askclone.services.ProfileService;
import com.mohamed.halim.essa.askclone.utils.DateUtils;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ProfileController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ProfileControllerTests {
   Profile profile;
   ProfileDto dto;
   Date date;

   @BeforeEach
   public void setup() {
      date = new Date();
      profile = Profile.builder()
            .username("username")
            .displayname("displayname")
            .allowAnoymousQuestions(true)
            .bio("bio")
            .birthday(date)
            .coverPictureUrl("coverPictureUrl")
            .status(Status.INVISIBLE)
            .gender(Gender.MALE)
            .build();
      dto = ProfileDto.builder()
            .username("username")
            .fullname("displayname")
            .allowAnoymousQuestions(true)
            .bio("bio")
            .day(DateUtils.getDay(profile.getBirthday()))
            .month(DateUtils.getMonth(profile.getBirthday()))
            .year(DateUtils.getYear(profile.getBirthday()))
            .profileImageUrl("coverPictureUrl")
            .status(false)
            .gender(Gender.MALE.toString())
            .build();

   }

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private ProfileService profileService;

   @Test
   public void test_updateprofile() throws Exception {
      doNothing().when(profileService).updateProfile(isA(ProfileDto.class));

      mockMvc.perform(
            MockMvcRequestBuilders.post("/profile/update")
                  .content(asJsonString(dto))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andDo(MockMvcResultHandlers.print())
            .andExpect(status().isOk());

   }

   static String asJsonString(final Object obj) {
      try {
         String s = new ObjectMapper().writeValueAsString(obj);
         System.out.println(s);
         return s;
      } catch (Exception e) {
         throw new RuntimeException(e);
      }
   }

}
