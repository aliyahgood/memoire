import React, { useState } from "react";
import "./options.scss"; 

const Options = ( {postId }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {  
    if (!postId) {
      alert("Error: No post ID found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/experience/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log("Post deleted successfully!");
        setShowModal(false); 
        window.location.reload(); 
      } else {
        console.error("Error deleting post");
        alert("Error deleting post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting post");
    }
  };
  

  return (
    <div>
      <div className="options-dropdown" onClick={openModal}>
        Delete Post
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure?</h2>
            <p>Do you really want to delete this post? This action cannot be undone.</p>
            <button onClick={handleDelete} >Yes, Delete</button>
            <button onClick={closeModal} style={{backgroundColor: 'gray'}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;