package com.mohamed.halim.essa.askclone.utils;

import java.util.Date;

public class DateConverter {

   public static Long dateToLong(Date date) {
      if (date == null)
         return 0L;
      return date.getTime();

   }

}