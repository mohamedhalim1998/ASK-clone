package com.mohamed.halim.essa.askclone.controller;

import java.io.FileNotFoundException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mohamed.halim.essa.askclone.services.ImageService;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/image")
@Slf4j
public class ImageController {
   private ImageService imageService;

   public ImageController(ImageService imageService) {
      this.imageService = imageService;
   }

   @GetMapping("/{name}")
   public ResponseEntity<Resource> getImage(@PathVariable String name, HttpServletRequest request) throws FileNotFoundException {
      log.info(name);
      Resource resource = imageService.loadImage(name);
      return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);
   }
}
