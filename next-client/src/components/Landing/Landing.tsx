import { FiDownload } from "react-icons/fi";
import "./landing.css";
import { SkillsRatigsSlider } from "./SkillsRatigsSlider";
import { Button } from "@heroui/button";
import { Image } from "@heroui/react";
import SocialContactBar from "../UI/ContactBar/ContactBar";
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
        <div className="home-intro">
          <div className="intro">
            <div className="home-intro-text">
              <h2>Deep Hansda</h2>
              <p>
                "Be Water, My Friend."
                <br />
                <span>--Bruce Lee</span>
              </p>
            </div>

            <div className="my-3">
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
        <div className="git-img">
          <div className="git-img-container">
            <Image
              src="https://res.cloudinary.com/manjiro/image/upload/v1681965589/portfolio_images/git/portfolio_images/git/contributions.png.png"
              alt="git"
              width={676}
              isBlurred={true}
              className="max-w-full h-auto   mx-auto"
            />
          </div>
          <div className="px-3 my-3">
            <p className="pb-2 text-tiny">Connect With ME.</p>
            <SocialContactBar/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
