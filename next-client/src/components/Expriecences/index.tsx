import request from "@/utils/AxiosUtils";
import { GET_EXPRIENCES } from "@/utils/AxiosUtils/api";
import { dateConverter } from "@/utils/dateConverter";
import { monthDiff } from "@/utils/monthDiff";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./Expriences.module.css";
import Exprience from "./Exprience";

function Expriences() {
  const {
    data: expriences,
    isLoading,
    error,
  } = useQuery([GET_EXPRIENCES], () => request({ url: GET_EXPRIENCES }), {
    select: (data) => data?.expriences,
  });
  return (
    <div className={styles.exprience}>
      <div className={styles.exprienceContainer}>
        <div className="container">
          <div className={styles.exprienceTitle}>
            <h2>Expriences.</h2>
          </div>
          <div className="steps">
            {expriences?.length > 0 &&
              expriences?.map((ex: Record<string, any>, i: number) => {
                return (
                  <Exprience exprience={ex} key={i} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expriences;
