import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function WebSlider({ images }) {

  var settings = {
    lazyLoad: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    arrows: false,
  };

  return (
    <div className="web-slide-container">
      <Slider {...settings}>
        {images.map((image) => {
          return (
            
            <div className="project-img">
              <img src={image.img} alt="project-img" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default WebSlider;
