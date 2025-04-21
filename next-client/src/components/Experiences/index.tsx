import request from "@/utils/AxiosUtils";
import { GET_EXPRIENCES } from "@/utils/AxiosUtils/api";
import { useQuery } from "@tanstack/react-query";
import ContainerWithTitle from "../Layouts/container-with-title";
import Experience from "./Experience";

function Experiences() {
  const {
    data: experiences,
    isLoading,
    error,
  } = useQuery([GET_EXPRIENCES], () => request({ url: GET_EXPRIENCES }), {
    select: (data) => data?.experiences,
  });
  return (
    <ContainerWithTitle title="Experiences.">
      <div className="steps">
        {experiences?.length > 0 &&
          experiences?.map((ex: Record<string, any>, i: number) => {
            return <Experience experience={ex} key={i} />;
          })}
      </div>
    </ContainerWithTitle>
  );
}

export default Experiences;
