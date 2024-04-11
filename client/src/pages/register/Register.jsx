import { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState(null); // State for error message

  const { loading, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Kiểm tra xác nhận mật khẩu
    if (credentials.password !== credentials.confirmPassword) {
      alert("Mật khẩu không hợp lệ");
      return;
    }
    // Kiểm tra tính hợp lệ của email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(credentials.email)) {
      alert("Email không hợp lệ");
      return;
    }

    const res = await register(credentials);
    if (res) {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        <div className="register">
          <div className="rContainer">
            <div className="rHeader">Đăng ký</div>
            <input
              type="text"
              placeholder="Tên tài khoản"
              id="username"
              onChange={handleChange}
              className="rInput"
              required
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className="rInput"
              required
            />
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Mật khẩu"
              id="password"
              onChange={handleChange}
              className="rInput"
              required
            />
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Nhập lại mật khẩu"
              id="confirmPassword"
              onChange={handleChange}
              className="rInput"
              required
            />
            <div className="show-password-container">
              <input
                style={{ height: "20px" }}
                type="checkbox"
                id="showPassword"
                checked={showPassword} // Set checkbox state
                onChange={handleShowPassword}
              />
              <label htmlFor="showPassword">Hiển thị mật khẩu</label>
            </div>
            <button
              disabled={loading}
              onClick={handleClick}
              className="rButton"
            >
              Đăng ký
            </button>
            {error && <span>{error}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
