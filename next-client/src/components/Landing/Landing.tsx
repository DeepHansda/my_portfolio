import { Button } from "@heroui/button";
import { Image } from "@heroui/react";
import { FiDownload } from "react-icons/fi";
import SocialContactBar from "../UI/ContactBar/ContactBar";
import { SkillsRatigsSlider } from "./SkillsRatigsSlider";
import styles from "./landing.module.css";
function Landing() {
  return (
    <div className={styles.home}>
      <div className={styles.home_container}>
        <div className={styles.home_intro}>
          <div className={styles.intro}>
            <div className={styles.home_intro_text}>
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

          <div className={styles.progress_bars}>
            <SkillsRatigsSlider />
          </div>
        </div>
        <div className={styles.git_img}>
          <div className={styles.git_img_container}>
            <Image
              src="https://res.cloudinary.com/manjiro/image/upload/v1681965589/portfolio_images/git/portfolio_images/git/contributions.png.png"
              alt="git"
              width={676}
              isBlurred={true}
              className="max-w-full h-auto mx-auto"
            />
          </div>
          <div className="px-3 my-3">
            <p className="pb-2 text-tiny">Connect With ME.</p>
            <SocialContactBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
