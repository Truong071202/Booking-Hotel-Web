import { useState } from "react";
import "./mailList.css";

const MailList = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubscribe = () => {
    // Kiểm tra xem email có đúng định dạng không
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Vui lòng nhập địa chỉ email hợp lệ!");
      return;
    }

    // Thực hiện xác nhận và lưu trữ email ở đây (có thể gọi API để xử lý)

    // Hiển thị thông báo
    setShowAlert(true);

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
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Đăng ký</button>
      </div>
      {showAlert && (
        <div className="alert">
          <span className="close" onClick={() => setShowAlert(false)}>
            &times;
          </span>
          <strong>Thành công!</strong> Email của bạn đã được đăng ký.
        </div>
      )}
    </div>
  );
};

export default MailList;
