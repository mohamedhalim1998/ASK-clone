package com.mohamed.halim.essa.askclone.repository;

import com.mohamed.halim.essa.askclone.model.AppUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, String> {
   @Query("SELECT u FROM AppUser u WHERE u.email = :email")
   public AppUser findByEmail(@Param("email") String email);

   @Query("SELECT u FROM AppUser u WHERE u.username = :username")
   public AppUser findByUsername(@Param("username") String username);
}
