package com.mohamed.halim.essa.askclone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

   @Bean
   public UserDetailsService userDetailsService() {
      return new CustomUserDetailsService();
   }

   @Bean
   public BCryptPasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
   }

   @Bean
   public DaoAuthenticationProvider authenticationProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
      authProvider.setUserDetailsService(userDetailsService());
      authProvider.setPasswordEncoder(passwordEncoder());

      return authProvider;
   }

   @Bean
   public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
      AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
      auth.authenticationProvider(authenticationProvider());
      return auth.build();
   }

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http.cors().disable().csrf().disable()
            .authorizeRequests()
            .antMatchers("/h2-console/**").permitAll()
            .antMatchers("/user/signup/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .defaultSuccessUrl("/user/login/success", true)
            .loginPage("/user/login").permitAll()
            .loginProcessingUrl("/doLogin")
            .passwordParameter("password")
            .usernameParameter("username");

      http.headers().frameOptions().disable();
      return http.build();
   }

}