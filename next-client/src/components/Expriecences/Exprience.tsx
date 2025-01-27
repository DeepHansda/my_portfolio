import Image from "next/image";
import React from "react";
import styles from "./Expriences.module.css";
import { dateConverter } from "@/utils/dateConverter";
import { monthDiff } from "@/utils/monthDiff";

const Exprience = ({
  exprience,
}: {
  exprience: Record<string, any>;
}) => {
  return (
    <div className="steps-container">
      <div className={styles.expContent}>
        <h2>{exprience.title}</h2>
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

        <div
          className={styles.expriencesStepsDesc}
          dangerouslySetInnerHTML={{ __html: exprience.des }}
        ></div>

        <div className={styles.expSkillsContainer}>
          {exprience.skills.map((skill: Record<string, any>) => (
            <div key={skill.title} className={styles.expSkills}>
              <p>&middot; {skill.title}</p>
            </div>
          ))}
        </div>
      </div>
      <i className="step-line"></i>
      <div className={styles.expriencesStepsImg}>
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