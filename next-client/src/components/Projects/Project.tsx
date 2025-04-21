"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import ProjectImagesSlider from "./ProjectImagesSlider";
import dynamic from "next/dynamic";

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
        <CardHeader>
          <div>
            <ClientOnlySlider
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
