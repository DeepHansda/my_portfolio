import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function WebSlider({ images }) {
  // var settings = {
  //   infinite: true,
  //   speed: 2000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   adaptiveHeight: true,
  //   arrows: false,
  // };

  return (
    <div className="web-slide-container">
      <Slider >
        {images.map((image, index) => {
          return (
            <div key={index} className="project-img">
              <img src={image.img} alt="project-img" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default WebSlider;
