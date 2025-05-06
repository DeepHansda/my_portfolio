"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import dynamic from "next/dynamic";
import ProjectImagesSlider from "./ProjectImagesSlider";

const ClientOnlySlider = dynamic(() => import("./ProjectImagesSlider"), {
  ssr: false, // 👈 super important!
});
export default function Project({
  project,
}: {
  project: Record<string, unknown>;
}) {
  const htmlString = `<div>${project.description}</div>`;
  return (
    <div>
      <Card>
        <CardHeader className="flex-col items-start">
          <div>
            <ProjectImagesSlider
              images={project.project_img as Record<string, string>[]}
            />
          </div>
          <div>
            <h1>{project.title as string}</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div dangerouslySetInnerHTML={{ __html: htmlString }} />
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
