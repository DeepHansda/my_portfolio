import request from "@/utils/AxiosUtils";
import { GET_PROJECTS } from "@/utils/AxiosUtils/api";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Project from "./Project";

export default function ProjectsContainer({
  projectType,
}: {
  projectType: string;
}) {
  const { data: projects, isLoading } = useQuery({
    queryKey: [GET_PROJECTS],
    queryFn: () => request({ url: GET_PROJECTS, params: { projectType } }),
    select(data) {
      return data?.data;
    },
  });

  if (isLoading) {
    return <Spinner color="secondary" />;
  }

  return (
    <div>
      <div className="grid  grid-cols-1 md:grid-cols-2  gap-6">
        {projects?.map((project: Record<string, unknown>, index: number) => (
          <Project project={project} key={index} />
        ))}
      </div>
    </div>
  );
}
