import React, { useState } from "react";
import "./createpost.scss";

const CreatePost = ({ showModal, setShowModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");  
  const [description, setDescription] = useState("");  

  const nextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentStep(1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form submitted')

    const experienceData = {
      username: 'greg2cool',
      title,
      rating: parseInt(rating),
      description: description || null,
      img: image || null, 
    };

    console.log(experienceData);

    try {
      const response = await fetch('http://localhost:8080/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      });
      if (response.ok) {
        window.location.reload(); 
      } else {
        alert('Error creating experience');
      }
    } catch (error) {
      console.error("Error submitting experience:", error);
      alert("Error creating experience");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h1>Log an Experience</h1>
            <form onSubmit={nextStep}>
              <h2>Choose a Title</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
              <button type="submit">Next</button>
            </form>
          </div>
        );
      case 2:
        return (
          <div>
            <h1>Log an Experience</h1>
            <form onSubmit={nextStep}>
              <h2>How would you rate it?</h2>
              <select
                id="rating"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)} 
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit">Next</button>
              <button onClick={prevStep}>Back</button>
            </form>
          </div>
        );
      case 3:
        return (
          <div>
            <h1>Log an Experience</h1>
            <form onSubmit={nextStep}>
              <h2>Add a description</h2>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
              />
              <button type="submit">Next</button>
              <button onClick={prevStep}>Back</button>
            </form>
          </div>
        );
      case 4:
        return (
          <div>
            <h1>Log an Experience</h1>
            <form onSubmit={nextStep}>
              <h2>Share an image</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {image && <img src={image} alt="Uploaded Preview" width="100" />}
              <button type="submit">Next</button>
              <button onClick={prevStep}>Back</button>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="review">
            <h1>Log an Experience</h1>
            <form onSubmit={handleSubmit}>
              <h2>Review Your Post</h2>
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Description:</strong> {description}</p>
              <p><strong>Rating:</strong> {rating}</p>
              {image && (
                <div>
                  <h3>Uploaded Image:</h3>
                  <img src={image} alt="Uploaded Preview" width="100" />
                </div>
              )}
              <button type="submit">Submit</button>
              <button onClick={prevStep}>Back</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  if (!showModal) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default CreatePost;
