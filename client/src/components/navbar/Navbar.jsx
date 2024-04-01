import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HotelBooking</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span>{user.username}</span>
            <button className="navButton" onClick={handleLogout}>
              Đăng xuất
            </button>
            <Link to="/login" style={{ display: "none" }}>
              Đăng nhập
            </Link>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">
              <Link style={{ textDecoration: "none" }} to="/register">
                Đăng ký
              </Link>
            </button>
            <button style={{ padding: "5px", marginLeft: "20px" }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Đăng nhập
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
