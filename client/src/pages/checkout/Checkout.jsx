import React, { useState } from "react";
import "./checkout.css";
import Navbar from "../../components/navbar/Navbar";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState(""); // State để lưu trữ phương thức thanh toán đã chọn

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
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
          <h3 className="textPay">
            Hãy lựa chọn các hình thức thanh toán dưới đây
          </h3>
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
          <button className="checkoutButton">Confirm</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
