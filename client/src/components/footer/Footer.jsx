import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <div className="footer-info">
          <h3>Về chúng tôi</h3>
          <p>
            Trang web này được tạo ra để cung cấp dịch vụ đặt phòng trực tuyến
            dễ dàng và thuận tiện.
          </p>
          <p>
            Chúng tôi cam kết mang đến trải nghiệm đặt phòng tốt nhất cho bạn!
          </p>
        </div>

        <div className="footer-about">
          <h3>Tranh chính</h3>
          <Link to="/" style={{ color: "#006ce4", textDecoration: "none" }}>
            <span className="logo">HotelBooking</span>
          </Link>
        </div>
        <div className="footer-contact">
          <h3>Liên hệ</h3>
          <p>Email: DChotelbooking@gmail.com</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Địa chỉ: Số 123, Đường ABC, Thành phố XYZ</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Tất cả các quyền đã được bảo lưu.</p>
      </div>
    </div>
  );
};

export default Footer;
