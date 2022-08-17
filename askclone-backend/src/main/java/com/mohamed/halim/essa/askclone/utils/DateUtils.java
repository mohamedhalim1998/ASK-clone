package com.mohamed.halim.essa.askclone.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtils {

   public static Long dateToLong(Date date) {
      if (date == null)
         return 0L;
      return date.getTime();
   }

   public static int getDay(Date date) {
      if (date == null)
         date = new Date();
      Calendar calendar = Calendar.getInstance();
      calendar.setTime(date);
      return calendar.get(Calendar.DAY_OF_MONTH);
   }

   public static int getMonth(Date date) {
      if (date == null)
         date = new Date();
      Calendar calendar = Calendar.getInstance();
      calendar.setTime(date);
      return calendar.get(Calendar.MONTH);
   }

   public static int getYear(Date date) {
      if (date == null)
         date = new Date();
      Calendar calendar = Calendar.getInstance();
      calendar.setTime(date);
      return calendar.get(Calendar.YEAR);
   }

   public static Date getDateFromFields(int day, int month, int year) {
      Calendar calendar = Calendar.getInstance();
      calendar.set(Calendar.DAY_OF_MONTH, day);
      calendar.set(Calendar.MONTH, month);
      calendar.set(Calendar.YEAR, year);
      return calendar.getTime();
   }
}