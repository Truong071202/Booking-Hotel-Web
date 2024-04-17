import { useState } from "react";
import "./mailList.css";

const MailList = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = () => {
    // Kiểm tra xem email có đúng định dạng không
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ!");
      setSuccessMessage(""); // Reset success message
      return;
    }

    // Thực hiện xác nhận và lưu trữ email ở đây (có thể gọi API để xử lý)

    // Hiển thị thông báo thành công
    setSuccessMessage("Email của bạn đã được đăng ký!");
    setErrorMessage(""); // Reset error message

    // Xóa email sau khi đăng ký
    setEmail("");
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Tiết kiệm thời gian, tiết kiệm tiền!</h1>
      <span className="mailDesc">
        Đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn
      </span>
      <div className="mailInputContainer">
        <input
          type="text"
          placeholder="Nhập Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Đăng ký</button>
      </div>
      {/* Chỉ hiển thị một trong hai thông báo */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && !errorMessage && (
        <div className="successMessage">{successMessage}</div>
      )}
    </div>
  );
};

export default MailList;
