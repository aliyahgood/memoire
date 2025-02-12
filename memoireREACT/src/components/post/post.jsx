import "./post.scss";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Options from "../options/options";

const Post = ({ post }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const optionsRef = useRef(null);

  const toggleOptions = (event) => {
    event.stopPropagation();
    setOpenOptions((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { username, title, description, rating, img } = post;

  return (
    <div className="post">
      <div className="postcontainer">
        <div className="user">
          <div className="userInfo">
            <Link
              to={`/profile/${post.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="name">@{username}:</span>
            </Link>
          </div>
          <div className="options-container">
            <SlOptions onClick={toggleOptions} className="options-icon" />
            {openOptions && (
              <div className="options-menu" ref={optionsRef}>
                <Options postId={post.id}/>
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <h2>{title}</h2> 
          Rating: {rating}
          {description && <p>{description}</p>}
          {img && <img src={img} alt="Post image" />}
        </div>
      </div>
    </div>
  );
};

export default Post;