import { dateConverter } from "@/utils/dateConverter";
import { monthDiff } from "@/utils/monthDiff";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import Image from "next/image";
import styles from "./Experiences.module.css";
const Experience = ({ experience }: { experience: Record<string, any> }) => {
  return (
    <div className="steps-container">
      <Card className="w-[600px]">
        <CardHeader className="flex-col items-start">
          <h2 className="text-2xl font-[Poppins] capitalize">
            {experience.title}
          </h2>
          <div className={styles.expCompany}>
            <h4>{experience.companyName}</h4>
            <p> &middot; {experience.position}</p>
          </div>
          <div className={styles.expDateContainer}>
            <div className={styles.stepDate}>
              <p>{dateConverter(experience.duration.joiningDate)}</p>-
              <p>{dateConverter(experience.duration.leavingDate)}</p>
            </div>
            <div className={styles.expMonthfDiff}>
              <p>
                &middot;{" "}
                {monthDiff(
                  new Date(experience.duration.joiningDate),
                  new Date(experience.duration.leavingDate)
                )}{" "}
                Months
              </p>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div
            className={styles.experiencesStepsDesc}
            dangerouslySetInnerHTML={{ __html: experience.des }}
          ></div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className={styles.expSkillsContainer}>
            {experience.skills.map((skill: Record<string, any>) => (
              <div key={skill.title} className={styles.expSkills}>
                <p>&middot; {skill.title}</p>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
      <i className="step-line"></i>
      <div>
        <Image
          src={experience.companyLogo}
          alt={experience.companyLogo}
          width={65}
          height={65}
        />
      </div>
    </div>
  );
};

export default Experience;
