import React, { useState } from "react";
import WhatsAppImage from '../assests/WhatsApp.png'
import AmyraaSmallLogo from '../assests/AmyraaSmallLogo.png'
import "./YourMainComponent.css";

const YourMainComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    mobileNumber: "7601088278",
    message: "",
  });
  const [messageEmptyError, setMessageEmptyError] = useState(false); // Add this line

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.message.length < 1) {
      // Handle empty message
      setMessageEmptyError(true);
      setTimeout(() => setMessageEmptyError(false), 3000);  
    } else {
      // Appending the phone number to the URL
      let url = `https://web.whatsapp.com/send?phone=${formData.mobileNumber}`;
 
      // Appending the message to the URL by encoding it
      url += `&text=${encodeURI(formData.message)}&app_absent=0`;

      // Open our newly created URL in a new tab to send the message
      window.open(url);

      // Close the modal after sending the message
      closeModal();
    }
  };

  return (
    <div className="communication">
      <div className="whatsapp-logo" onClick={openModal}>
      <div className="whatsApp-icon-btn" >
      <img src={WhatsAppImage} alt="" className="whatsApp-icon" />
      <h3>Get Support</h3>
      </div>
       
      </div>
      {isModalOpen && (
      
          <div className="modal open">
            <div className="modal-header">
              <div className="icon-group-logo" > <img src={AmyraaSmallLogo} width={"30px"}  alt="" /> <h6>Amyraa Support</h6> </div>
              <div className="close-btn" onClick={closeModal}>
                &times;
              </div>
            </div>
            <div className="modal-content">
            <h4 className="message-heading">Message</h4>
              <textarea
                placeholder="Please enter your message"
                name="message"
                value={formData.message}
                onChange={onChange}
                required
              />
              {messageEmptyError && (
                <div className="error-message">Message cannot be empty!</div>
              )}
              <button className="send-button" onClick={onSubmit}>
                Send Message
              </button>
            </div>
          </div>
        
      )}
    </div>
  );
};

export default YourMainComponent;
