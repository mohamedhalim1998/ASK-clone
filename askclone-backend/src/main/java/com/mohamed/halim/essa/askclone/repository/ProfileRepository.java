package com.mohamed.halim.essa.askclone.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mohamed.halim.essa.askclone.model.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {

   @Query("SELECT p FROM Profile p WHERE p.username IN :names")
   List<Profile> findAllByUsernameList(@Param("names") List<String> names);

   @Query("SELECT p FROM Profile p WHERE p.username LIKE CONCAT('%',:q,'%') OR p.displayname LIKE CONCAT('%',:q,'%')")
   List<Profile> searchProfiles(@Param("q") String query, Pageable pageable);
}
