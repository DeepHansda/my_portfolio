
import { FiDownload } from "react-icons/fi";
import "./landing.css";
import { SkillsRatigsSlider } from "./SkillsRatigsSlider";
function Landing() {
  return (
    <div className="home">
      {/* <div className="home-background backdrop-blur-4xl bg-black/30">
        <img
          src={
            "https://res.cloudinary.com/manjiro/image/upload/v1655702305/portfolio_images/xor/fotis-fotopoulos-6sAl6aQ4OWI-unsplash_s50hcp.jpg"
          }
          alt="bg"
        />
      </div> */}
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
          <SkillsRatigsSlider/>
        </div>
      </div>
    </div>
  );
}

export default Landing;
