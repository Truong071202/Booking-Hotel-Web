import React, { useState } from "react";
import "./information.css";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Navbar from "./../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const Information = () => {
  const [email, setEmail] = useState(""); // State to store email

  const handleEmailValidation = () => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleButtonClick = () => {
    // Check if email is valid
    if (handleEmailValidation()) {
      // If valid, navigate to "/checkout"
      window.location.href = "/checkout";
    } else {
      // If not valid, show an alert or handle it as per your requirement
      alert("Email không hợp lệ. Vui lòng kiểm tra lại!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="Information">
        <h2>Nhập thông tin</h2>
        <div className="inputContainer">
          <label htmlFor="fullName">Họ và tên:</label>
          <input type="text" id="fullName" name="fullName" />
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
          <input type="tel" id="phoneNumber" name="phoneNumber" />
        </div>
        <p className="reminder">Vui lòng nhập đầy đủ thông tin ở phía trên!</p>
        <Link
          className="submitButton"
          style={{ textDecoration: "none" }}
          to="/checkout"
          onClick={(e) => {
            // Prevent default link behavior
            e.preventDefault();
            // Call handleButtonClick when link clicked
            handleButtonClick();
          }}
        >
          Xác nhận thông tin
        </Link>
      </div>
      <MailList />
      <Footer />
    </>
  );
};

export default Information;
