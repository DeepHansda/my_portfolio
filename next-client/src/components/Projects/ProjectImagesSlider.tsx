"use client";

import { Image } from "@heroui/react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
function ProjectImagesSlider({ images }: { images: Record<string, string>[] }) {
  const options: EmblaOptionsType = { loop: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  console.log(images);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__img">
                <Image src={image.img} alt="project-img" width={600} isBlurred />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectImagesSlider;
