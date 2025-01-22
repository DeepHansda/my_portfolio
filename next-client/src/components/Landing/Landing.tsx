import { FiDownload } from "react-icons/fi";
import "./landing.css";
import { SkillsRatigsSlider } from "./SkillsRatigsSlider";
import Image from "next/image";
import { Button } from "@heroui/button";
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
        <div>
          <div className="intro">
            <div className="home-intro-text">
              <h2>Deep Hansda</h2>
              <p>
                "Be Water, My Friend."
                <br />
                <span>--Bruce Lee</span>
              </p>
            </div>

            <div className="my-2">
              <Button
                variant="shadow"
                color="secondary"
                size="md"
                startContent={<FiDownload />}
              >
                Download Resume.
              </Button>
            </div>
          </div>

          <div className="progress-bars">
            <SkillsRatigsSlider />
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full px-3">
            <Image
              src="https://res.cloudinary.com/manjiro/image/upload/v1681965589/portfolio_images/git/portfolio_images/git/contributions.png.png"
              alt="git"
              width={676}
              height={614}
              className="max-w-full h-auto  shadow-xl mx-auto shadow-green-500/25"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
