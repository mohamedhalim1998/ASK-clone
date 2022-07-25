package com.mohamed.halim.essa.askclone.model;

public enum Gender {
   MALE("male"), FEMALE("female");

   private String value;

   Gender(String value) {
      this.value = value;
   }

   @Override
   public String toString() {
      return this.value;
   }
}
