import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiDownload } from "react-icons/fi";
import { ProgressData } from "../../utils/data/ProgressData";
import "./landing.css";
function Landing() {
  return (
    <div className="home">
      <div className="home-background">
        <img
          src={
            "https://res.cloudinary.com/manjiro/image/upload/v1655702305/portfolio_images/xor/fotis-fotopoulos-6sAl6aQ4OWI-unsplash_s50hcp.jpg"
          }
          alt="bg"
        />
      </div>
      <div className="home-container">
        <div className="intro">
          <div className="home-intro-text">
            <h2>Deep Hansda</h2>
            <p>
              "Be Water, My Friend."
              <br />
              <span>--Bruce Lee</span>
            </p>
          </div>

          <div className="download-button">
            <a
              href="https://drive.google.com/file/d/1g-wMWPzy0ZXblhYtfBmRE2SSpdVWRrqU/view?usp=sharing"
              target="_blank"
            >
              <p>
                <FiDownload />
              </p>
              <button>Download Portfolio</button>
            </a>
          </div>
        </div>

        <div className="progress-bars">
          <ul className="progress-bar-container">
            {ProgressData.map((data,index) => {
              return (
                <li key={index}>
                  <CircularProgressbar
                    value={data.percent}
                    text={`${data.percent}%`}
                    styles={{
                      // Customize the root svg element
                      root: {},
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Landing;
