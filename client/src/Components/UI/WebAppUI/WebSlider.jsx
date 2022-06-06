import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function WebSlider({ images }) {
  console.log(images);

  var settings = {
    // dots: true,
    // className: "",
    lazyLoad: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 6000,
    adaptiveHeight: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="web-slide-container">
      <Slider {...settings}>
        {images.map((image) => {
          console.log(image);
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
