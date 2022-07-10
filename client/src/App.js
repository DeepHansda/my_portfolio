import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ContactBar from "./Components/ContactSidebar/ContactBar";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { getProjects } from "./Redux/Actions/projectActions";
import MyRoutes from "./Util/MyRoutes";

export const ProjectContext = createContext();
function App() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [screen, setScreen] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    function handleScroll() {
      setOffset(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleSize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  console.log(screen);
  const projects = useSelector((state) => {
    return state.projects;
  });
  const states = {
    projects: projects,
    setOpenSideBar: setOpenSideBar,
    offset: offset,
  };
  return (
    <ProjectContext.Provider value={states}>
      <div className="App" style={{ overflowX: "hidden" }}>
        <div
          className="universalBackground"
          style={{ display: screen < 600 ? "none" : "block" }}
        >
          <img
            src={
              "https://res.cloudinary.com/manjiro/image/upload/v1657333328/portfolio_images/xor/background_uwvhvi.png"
            }
            alt="background"
            style={{
              transform: `${
                screen < 834 ? "none" : `translateY(${offset * 0.4}px)`
              }`,
            }}
          />
        </div>
        <Navbar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
        <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
        <ContactBar />
        <MyRoutes />
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
