import React, { useEffect, useState } from "react";
import Post from "../post/post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/experience");
        const data = await response.json();

        setPosts(data.experiences); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post
          post={{
            ...post,
            description: post.description && post.description !== "null" && post.description.trim() !== "" ? post.description : null,
            rating: post.rating,
            username: post.username,
            id: post.id
          }}
          key={post.id}
        />
      ))}
    </div>
  );
};

export default Posts;
