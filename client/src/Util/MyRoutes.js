import { Routes, Route } from "react-router-dom";
import Contact from "../Components/Contact/Contact";
import Main from "../Components/Main/Main";
import About from "../Components/About/About";
import {
  WebSection,
  AndroidSection,
} from "../Components/Projects/SectionRoutes";
import Resume from "../Components/Resume/Resume";
function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<WebSection />} />
        <Route path="/webProjects" element={<WebSection />} />
        <Route path="/androidProjects" element={<AndroidSection />} />
      </Route>
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default MyRoutes;
