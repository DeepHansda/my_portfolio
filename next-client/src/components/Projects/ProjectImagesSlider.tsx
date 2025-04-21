import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function ProjectImagesSlider({ images }: { images: Record<string, string>[] }) {
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

  console.log(images);

  return (
    <div className="web-slide-container">
      {/* <Slider > */}
        {images.map((image, index) => {
          return (
            <div key={index} className="">
              <Image
                src={image?.img}
                alt="project-img"
                width={400}
                height={600}
              />
            </div>
          );
        })}
      {/* </Slider> */}
    </div>
  );
}

export default ProjectImagesSlider;
