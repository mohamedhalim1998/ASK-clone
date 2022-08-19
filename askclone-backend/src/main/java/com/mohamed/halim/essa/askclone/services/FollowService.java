package com.mohamed.halim.essa.askclone.services;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mohamed.halim.essa.askclone.model.Follow;
import com.mohamed.halim.essa.askclone.repository.FollowRepository;

@Service
public class FollowService {

   private FollowRepository followRepository;

   public FollowService(FollowRepository followRepository) {
      this.followRepository = followRepository;
   }

   public boolean follows(String follower, String followee) {
      return followRepository.findByFollowerAndFollowee(follower, followee).isPresent();
   }

   public Follow addFollowee(String follower, String followee) {
      return followRepository.save(Follow.builder().follower(follower).followee(followee).build());
   }

   @Transactional
   public void deleteFollowee(String follower, String followee) {
      followRepository.deleteByFollowerAndFollowee(follower, followee);
   }

}
