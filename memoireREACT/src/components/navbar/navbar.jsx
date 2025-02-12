import React, { useState, useEffect, useRef } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { SlHome, SlUser, SlPlus } from "react-icons/sl";
import CreatePost from "../createpost/createpost"; 
import GettingStarted from "../gettingstarted/gettingstarted"; 

const Navbar = () => {
  const [showModal, setShowModal] = useState(false); 
  const [showTooltip, setShowTooltip] = useState(false); 
  const postLinkRef = useRef(null); 

  useEffect(() => {
    if (!localStorage.getItem("visited")) {
      setShowTooltip(true); 
      localStorage.setItem("visited", "true"); 
    }
  }, []);

  const closeTooltip = () => {
    setShowTooltip(false); 
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>memoire.</span>
        </Link>
      </div>
      <div className="right">
        <Link to="/">
          <SlHome />
        </Link>

        <SlPlus
          onClick={() => setShowModal(true)}
          style={{ 
            color: 'white', 
            fontSize: '32px', 
            cursor: "pointer", 
            position: "relative", 
            top: "-2px" 
          }}
          
          ref={postLinkRef} 
        />

        <Link to="/profile/greg2cool">
          <SlUser />
        </Link>

        <CreatePost showModal={showModal} setShowModal={setShowModal} />

        {showTooltip && <GettingStarted targetRef={postLinkRef} closeTooltip={closeTooltip} />}
      </div>
    </div>
  );
};

export default Navbar;
