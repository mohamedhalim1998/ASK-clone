package com.mohamed.halim.essa.askclone.model;

public enum Status {
   INVISIBLE("invisble"), ONLINE("online");

   private String value;

   Status(String value) {
      this.value = value;
   }

   @Override
   public String toString() {

      return this.value;
   }

}
