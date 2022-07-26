package com.mohamed.halim.essa.askclone;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohamed.halim.essa.askclone.model.AppUser;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.annotation.DirtiesContext.ClassMode;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class authTests {

   @Autowired
   MockMvc mockMvc;

   @Test
   void test_signup() throws Exception {
      AppUser user = new AppUser();
      user.setUsername("testUser");
      user.setEmail("e@e.com");
      user.setPassword("test");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());
   }

   @Test
   void test_signupWithWrongParams() throws Exception {
      AppUser user = new AppUser();
      user.setUsername("testUser");
      user.setPassword("test");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().is4xxClientError());
   }

   @Test
   void test_signupWithDublicatedEmail() throws Exception {
      AppUser user = new AppUser();
      user.setUsername("testUser");
      user.setEmail("e@e.com");
      user.setPassword("test");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());

      user.setUsername("testUser2");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isConflict())
            .andExpect(jsonPath("$").value("email already used"));

   }

   @Test
   void test_signupWithDublicatedUsername() throws Exception {
      AppUser user = new AppUser();
      user.setUsername("testUser");
      user.setEmail("e@e.com");
      user.setPassword("test");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());

      user.setEmail("e@m.com");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isConflict())
            .andExpect(jsonPath("$").value("user already used"));

   }

   @Test
   void test_login() throws Exception {
      AppUser user = new AppUser();
      user.setUsername("testUser");
      user.setEmail("e@e.com");
      user.setPassword("test");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());

      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/login")
                  .content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());

   }

   @Test
   void test_loginFail() throws Exception {
      AppUser user = new AppUser();
      user.setUsername("testUser");
      user.setEmail("e@e.com");
      user.setPassword("test");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());
      user.setUsername("testUser2");

      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/login")
                  .content(asJsonString(user))

                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isUnauthorized());

   }

   @Test
   public void test_loginjwt() throws Exception {
      AppUser user = new AppUser();
      user.setUsername("testUser");
      user.setEmail("e@e.com");
      user.setPassword("test");
      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/signup").content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());

      mockMvc
            .perform(MockMvcRequestBuilders.post("/user/login")
                  .content(asJsonString(user))
                  .contentType(MediaType.APPLICATION_JSON)
                  .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(header().exists("access_token"));
   }

   static String asJsonString(final Object obj) {
      try {
         return new ObjectMapper().writeValueAsString(obj);
      } catch (Exception e) {
         throw new RuntimeException(e);
      }
   }
}
