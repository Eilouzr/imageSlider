package com.imageslider.home.model;

import org.springframework.data.annotation.Id;

public record Slider (@Id Integer id , String url, Integer duration) {

}
