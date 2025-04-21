import { Tab, Tabs } from "@heroui/react";
import React from "react";
import ContainerWithTitle from "../Layouts/container-with-title";
import ProjectsContainer from "./ProjectsContainer";

export default function Projects() {
  const [selected, setSelected] = React.useState("webApp");

  return (
    <ContainerWithTitle title="Projects.">
      <Tabs selectedKey={selected} onSelectionChange={() => setSelected}>
        <Tab key="webApp" title="Web Apps.">
          <ProjectsContainer projectType={selected} />{" "}
        </Tab>
        <Tab key="androidApp" title="Mobile Apps.">
          <ProjectsContainer projectType={selected} />
        </Tab>
      </Tabs>
    </ContainerWithTitle>
  );
}
