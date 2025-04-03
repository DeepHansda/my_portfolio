import Image from "next/image";
import React from "react";
import styles from "./Expriences.module.css";
import { dateConverter } from "@/utils/dateConverter";
import { monthDiff } from "@/utils/monthDiff";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";

const Exprience = ({ exprience }: { exprience: Record<string, any> }) => {
  return (
    <div className="steps-container">
      <Card>
        <CardHeader className="flex-col items-start">
          <h2 className="text-2xl font-[Poppins] capitalize">{exprience.title}</h2>
          <div className={styles.expCompany}>
            <h4>{exprience.companyName}</h4>
            <p> &middot; {exprience.position}</p>
          </div>
          <div className={styles.expDateContainer}>
            <div className={styles.stepDate}>
              <p>{dateConverter(exprience.duration.joiningDate)}</p>-
              <p>{dateConverter(exprience.duration.leavingDate)}</p>
            </div>
            <div className={styles.expMonthfDiff}>
              <p>
                &middot;{" "}
                {monthDiff(
                  new Date(exprience.duration.joiningDate),
                  new Date(exprience.duration.leavingDate)
                )}{" "}
                Months
              </p>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div
            className={styles.expriencesStepsDesc}
            dangerouslySetInnerHTML={{ __html: exprience.des }}
          ></div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className={styles.expSkillsContainer}>
            {exprience.skills.map((skill: Record<string, any>) => (
              <div key={skill.title} className={styles.expSkills}>
                <p>&middot; {skill.title}</p>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
      <i className="step-line"></i>
      <div >
        <Image
          src={exprience.companyLogo}
          alt={exprience.companyLogo}
          width={65}
          height={65}
        />
      </div>
    </div>
  );
};

export default Exprience;
