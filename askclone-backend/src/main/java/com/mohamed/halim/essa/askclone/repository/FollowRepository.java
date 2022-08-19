package com.mohamed.halim.essa.askclone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mohamed.halim.essa.askclone.model.Follow;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

   @Query("SELECT f FROM Follow f WHERE f.followee = :followee AND f.follower = :follower")
   Optional<Follow> findByFollowerAndFollowee(@Param("follower") String follower, @Param("followee") String followee);

   @Modifying
   @Query("DELETE FROM Follow f WHERE f.followee = :followee AND f.follower = :follower")
   void deleteByFollowerAndFollowee(@Param("follower") String follower, @Param("followee") String followee);

}
