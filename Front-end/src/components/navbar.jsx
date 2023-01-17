import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../css/nav.css";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const NavBar = () => {
  const [isOn, setIsOn] = useState(false);
  const [theme, setTheme] = useState("light");
  const toggleSwitch = () => {
    setIsOn(!isOn);
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "black" }}
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            To Do App
          </a>
          <div className="navbar-nav ms-auto" style={{ color: "white" }}>
            <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
              <motion.div className="handle" layout transition={spring} />
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
