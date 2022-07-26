package com.mohamed.halim.essa.askclone.repository;

import com.mohamed.halim.essa.askclone.model.AppUser;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, String> {
   @Query("SELECT u FROM user u WHERE u.email = ?1")
   public AppUser findByEmail(String email);

   @Query("SELECT u FROM user u WHERE u.username = ?1")
   public AppUser findByUsername(String username);
}
