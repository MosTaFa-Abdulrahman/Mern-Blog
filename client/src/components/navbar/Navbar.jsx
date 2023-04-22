import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/userSlice";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logOut());
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="navbar">
      <div className="navLeft">
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <i className="navIcon fa-brands fa-facebook"></i>
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <i className="navIcon fa-brands fa-twitter"></i>
        </a>
        <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
          <i className="navIcon fa-brands fa-pinterest"></i>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <i className="navIcon fa-brands fa-square-instagram"></i>
        </a>
      </div>

      <div className="navCenter">
        <ul className="navList">
          <NavLink to="/" className="link">
            <li className="navListItem">Home</li>
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/write" className="link">
                <li className="navListItem">Write</li>
              </NavLink>
              <li
                className="navListItem"
                style={{ color: "red" }}
                onClick={handleLogout}
              >
                LOGOUT
              </li>
            </>
          ) : (
            <NavLink to="/login" className="link">
              <li className="navListItem" style={{ color: "blue" }}>
                LOGIN
              </li>
            </NavLink>
          )}
        </ul>
      </div>

      <div className="navRigth">
        {currentUser ? (
          <NavLink to={`/settings/${currentUser._id}`} className="link">
            <img src={currentUser.profilePicture} alt="" className="navImage" />
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
