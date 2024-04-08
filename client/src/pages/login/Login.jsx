import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const { loading, error, dispatch, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await login(credentials);
    if (res) {
      navigate("/"); // Nếu đăng nhập thành công, chuyển hướng đến trang /hom
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login">
          <div className="lContainer">
            <div className="lHeader">Login</div>
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="lInput"
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
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <button
              disabled={loading}
              onClick={handleClick}
              className="lButton"
            >
              Login
            </button>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
