package com.mohamed.halim.essa.askclone.config;

import java.util.List;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
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
      JwtAuthFilter jwtAuthFilter = new JwtAuthFilter(authenticationManager(http));
      jwtAuthFilter.setFilterProcessesUrl("/user/login");
      http.cors().and()
            .csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/profile/image/**").permitAll()
            .antMatchers("/h2-console/**").permitAll()
            .antMatchers("/user/signup/**").permitAll()
            .antMatchers("/user/login/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilter(jwtAuthFilter)
            .addFilterBefore(new JwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

      http.headers().frameOptions().disable();
      return http.build();
   }

   @Bean(name = "corsConfigurationSource")
   public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      configuration.setAllowedOrigins(List.of("*"));
      configuration.setAllowedMethods(List.of("*"));
      configuration.setAllowedHeaders(List.of("*"));
      configuration.setExposedHeaders(List.of("*"));
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
   }
}