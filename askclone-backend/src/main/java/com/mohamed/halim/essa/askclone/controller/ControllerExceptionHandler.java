package com.mohamed.halim.essa.askclone.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

   @ExceptionHandler
   public ResponseEntity<Object> handelException(WebRequest request, Exception e) {
      log.error(e.getMessage());
      e.printStackTrace();
      log.error(e.toString());
      Map<String, String> map = new HashMap<>();
      map.put("error", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
   }

}
