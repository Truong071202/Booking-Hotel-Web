import React, { useState } from "react";
import "./checkout.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "./../../components/mailList/MailList";
import Footer from "./../../components/footer/Footer";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    setConfirmed(false); // Reset confirmed when payment method changes
  };

  const handleConfirm = () => {
    if (selectedPayment !== "") {
      if (selectedPayment === "Thanh toán khi nhận phòng") {
        setConfirmed(true);
        setErrorMessage("");
      } else {
        setConfirmed(false);
        const selectedMethods = selectedPayment.split(", ");
        const message = `Chọn phương thức thanh toán thành công! Phòng sẽ được đặt sau khi sử dụng "${selectedMethods.join(
          ", "
        )}" để thanh toán.`;
        setErrorMessage(message);
      }
    } else {
      setErrorMessage("Vui lòng chọn ít nhất một phương thức thanh toán!");
    }
  };
  return (
    <>
      <Navbar />
      <div className="checkout">
        <div className="headerCheckout">
          <h3 className="headingText">
            Chọn 1 trong các phương thức thanh toán dưới đây
          </h3>
        </div>
        <div className="containerPayment">
          <div className="paymentMethod">
            <label className="payment">
              <input
                type="checkbox"
                value="Giao dịch qua tài khoản ngân hàng"
                checked={
                  selectedPayment === "Giao dịch qua tài khoản ngân hàng"
                }
                onChange={() =>
                  handlePaymentSelection("Giao dịch qua tài khoản ngân hàng")
                }
              />
              Giao dịch qua tài khoản ngân hàng
            </label>
            <label className="payment">
              <input
                type="checkbox"
                value="Thẻ ATM nội địa"
                checked={selectedPayment === "Thẻ ATM nội địa"}
                onChange={() => handlePaymentSelection("Thẻ ATM nội địa")}
              />
              Thẻ ATM nội địa
            </label>
            <label className="payment">
              <input
                type="checkbox"
                value="Thẻ tín dụng"
                checked={selectedPayment === "Thẻ tín dụng"}
                onChange={() => handlePaymentSelection("Thẻ tín dụng")}
              />
              Thẻ tín dụng
            </label>
            <label className="payment">
              <input
                type="checkbox"
                value="Thanh toán khi nhận phòng"
                checked={selectedPayment === "Thanh toán khi nhận phòng"}
                onChange={() =>
                  handlePaymentSelection("Thanh toán khi nhận phòng")
                }
              />
              Thanh toán khi nhận phòng
            </label>
          </div>
        </div>
        <div className="submitCheckout">
          <div className="infPrice">
            <div className="textPrice">Tổng giá tiền:</div>
            <span className="numberPrice"></span>
          </div>
          <button className="checkoutButton" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
        {errorMessage && (
          <p
            style={{ color: "red", textAlign: "center" }}
            className="errorMessage"
          >
            {errorMessage}
          </p>
        )}

        {confirmed && selectedPayment === "Thanh toán khi nhận phòng" && (
          <>
            <p
              className="messagePay"
              style={{ color: "red", textAlign: "center" }}
            >
              Đặt phòng thành công! Bạn sẽ thanh toán sau khi nhận phòng trực
              tiếp!
            </p>
          </>
        )}

        {confirmed && selectedPayment !== "Thanh toán khi nhận phòng" && (
          <>
            <p
              className="messagePay"
              style={{ color: "red", textAlign: "center" }}
            >
              Chọn phương thức thanh toán thành công! Phòng của bạn đã được đặt
              sau khi thanh toán!
            </p>
          </>
        )}
        <Link to="/">Quay trở lại trang chủ</Link>
      </div>
      <MailList />
      <Footer />
    </>
  );
};

export default Checkout;
