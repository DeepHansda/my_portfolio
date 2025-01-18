import { landingSliderData } from '@/utils/data/SliderData'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { CircularProgressbar } from 'react-circular-progressbar';
import { ProgressData } from '@/utils/data/ProgressData'
import "react-circular-progressbar/dist/styles.css";


export const SkillsRatigsSlider = () => {

  return (
    <Slider {...landingSliderData}>
      {ProgressData.map((data,index) => {
              return (
                <li key={index} className='w-5'>
                  <CircularProgressbar
                    value={data.percent}
                    text={`${data.percent}%`}
                    styles={{
                      // Customize the root svg element
                      root: {height:"100%"},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        // Path color
                        stroke: `rgba(225, 225, 255, ${data.percent / 100})`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "round",
                        // Customize transition animation
                        transition: "stroke-dashoffset 0.5s ease 0s",
                        // Rotate the path
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                        strokeWidth: "5",
                      },
                      // Customize the circle behind the path, i.e. the "total progress"
                      trail: {
                        // Trail color
                        stroke: "#da0aff",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                        strokeWidth: "1",
                        boxShadow:
                          "0 0 .2rem #fff,0 0 .2rem #fff,0 0 2rem #bc13fe,0 0 0.8rem #bc13fe,0 0 2.8rem #bc13fe,inset 0 0 1.3rem #bc13fe",
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: "#fff",
                        // Text size
                        fontSize: "16px",
                      },
                      // Customize background - only used when the `background` prop is true
                      background: {
                        fill: "#fff",
                      },
                    }}
                  />

                  <div className="progress-name">
                    <p>{data.name}</p>
                  </div>
                </li>
              );
            })}
    </Slider>
  );
}
