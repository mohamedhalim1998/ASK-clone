package com.mohamed.halim.essa.askclone.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebSecurityConfig {
   @Autowired
   private JwtUtils jwtUtils;

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
      JwtAuthFilter jwtAuthFilter = new JwtAuthFilter(authenticationManager(http), jwtUtils);
      jwtAuthFilter.setFilterProcessesUrl("/user/login");
      http.cors().disable().csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/h2-console/**").permitAll()
            .antMatchers("/user/signup/**").permitAll()
            .antMatchers("/user/login/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilter(jwtAuthFilter)
            .addFilterBefore(new JwtTokenFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class);

      http.headers().frameOptions().disable();
      return http.build();
   }

}