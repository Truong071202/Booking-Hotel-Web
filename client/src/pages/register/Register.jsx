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

  const { loading, error, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleClick = async (e) => {
    e.preventDefault();
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
            <div className="rHeader">Register</div>
            <input
              type="text"
              placeholder="Username"
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
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="rInput"
              required
            />
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Confirm Password"
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
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <button
              disabled={loading}
              onClick={handleClick}
              className="rButton"
            >
              Register
            </button>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
