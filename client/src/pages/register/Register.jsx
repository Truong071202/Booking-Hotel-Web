import { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./../../components/navbar/Navbar";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [passwordMatchError, setPasswordMatchError] = useState(false); // State for password match error

  const { loading, error, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordMatchError(true);
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
          <form onSubmit={handleSubmit} className="rContainer">
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
            {passwordMatchError && (
              <span
                style={{ textAlign: "center", color: "red" }}
                className="err-message"
              >
                Mật khẩu không khớp.
              </span>
            )}
            <button disabled={loading} className="rButton" type="submit">
              Đăng ký
            </button>
          </form>
          {error && <span className="error-message">{error.message}</span>}
        </div>
      </div>
    </>
  );
};

export default Register;
