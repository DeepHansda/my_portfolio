import Experiences from "@/components/Experiences";
import Projects from "@/components/Projects";
import Landing from "../../Landing/Landing";
function HomeComponent() {
  return (
    <div className="main">
      <Landing />
      <Experiences />
      <Projects />
    </div>
  );
}

export default HomeComponent;
