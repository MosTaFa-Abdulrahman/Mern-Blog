import "./sidebar.css";
import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethod";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await publicRequest.get("category/get/all");
        setCats(res.data);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0U9cDsmOBrWGR5sqkphsTmLwb8-bwE49yRA&usqp=CAU"
          alt=""
          className="sidebarImage"
        />
        <p className="sidebarInfoText">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <NavLink to={`/?cat=${c.name}`} key={c._id} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW</span>
        <div className="sidebarSocial">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <i className="sidebarIcon fa-brands fa-facebook"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <i className="sidebarIcon fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
            <i className="sidebarIcon fa-brands fa-pinterest"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
