import React, { useState } from "react";
import "./information.css";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Navbar from "./../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const Information = () => {
  const [fullName, setFullName] = useState(""); // State to store full name
  const [email, setEmail] = useState(""); // State to store email
  const [phoneNumber, setPhoneNumber] = useState(""); // State to store phone number
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const handleEmailValidation = () => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleButtonClick = () => {
    // Check if all fields are filled
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      phoneNumber.trim() === ""
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    // Check if email is valid
    if (!handleEmailValidation()) {
      setErrorMessage("Email không hợp lệ. Vui lòng kiểm tra lại!");
      return;
    }
    // Check if phoneNumber is numeric
    if (!/^\d+$/.test(phoneNumber)) {
      setErrorMessage("Số điện thoại phải là số!");
      return;
    }
    // If all validations pass, navigate to "/checkout"
    window.location.href = "/checkout";
  };

  return (
    <>
      <Navbar />
      <div className="Information">
        <h2>Nhập thông tin</h2>
        <div className="inputContainer">
          <label htmlFor="fullName">Họ và tên:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} // Update fullName state on change
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="phoneNumber">Số điện thoại:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} // Update phoneNumber state on change
          />
        </div>
        {errorMessage && <p className="reminder">{errorMessage}</p>}
        <button className="submitButton" onClick={handleButtonClick}>
          Xác nhận thông tin
        </button>
      </div>
      <MailList />
      <Footer />
    </>
  );
};

export default Information;
