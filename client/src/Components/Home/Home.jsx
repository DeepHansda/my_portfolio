import React, { useContext} from "react";
import "./home.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiDownload } from "react-icons/fi";
import { ProgressData } from "../../Data/ProgressData";
import { ProjectContext } from "../../App";
import ud from './spider65.jpg'
function Home() {
  const data = useContext(ProjectContext);
  const offset = data.offset
  return (
    <div className="home">
      <div className="home-background">
        <img src={ud} alt="" style={{transform: `translateY(${offset * 0.3}px)`}}/>
      </div>
      <div className="home-container">
        <div className="intro">
          <div className="home-intro-text">
            <h2>Deep Hansda</h2>
            <p>
              Full Stack Developer & Android Developer<span>--deep</span>
            </p>
          </div>

          <div className="download-button">
            <a
              href="https://drive.google.com/file/d/1PwbEa3E2byxMcFoTtsTA49QvVQXXeZUG/view?usp=sharing"
              target="_blank"
            >
              <button>
                Download Portfolio
              </button>
            </a>
          </div>
        </div>

        <div className="progress-bars">
          <ul className="progress-bar-container">
            {ProgressData.map((data) => {
              return (
                <li>
                  <CircularProgressbar
                    value={data.percent}
                    text={`${data.percent}%`}
                    styles={{
                      // Customize the root svg element
                      root: {},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        // Path color
                        stroke: `rgba(218, 10, 255, ${data.percent / 100})`,
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
                        stroke: "#fff",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                        strokeWidth: "1",
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: "#da0aff",
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
