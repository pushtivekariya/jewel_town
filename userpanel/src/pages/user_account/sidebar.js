import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css"
const Sidebar = () => {
  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem("login_info"));

  const log_out = () => {
    localStorage.removeItem("login_info");
    if (login.length > 0) {
      navigate("/login");
    }
    window.location.reload();
  };

  return (
    <>
      <div className="container sidepart__main" style={{borderRight:"7px solid #c39584",height:"500px",overflowX:'hidden'}}>
        <ul className="list-group">
       <h3 className="mb-5 mt-4 ms-4" style={{fontWeight:550}}>MY ACCOUNT</h3>
          <Link to="/account" className="sidebar__button mb-4 ms-4">
            Personal Information
          </Link>
          <Link to="/vieworder" className="sidebar__button mb-4 ms-4">
          Order History
          </Link>
          <Link to="/promocode" className="sidebar__button mb-4 ms-4">
          Promocode/Gifts
          </Link>
          <Link to="/login" className="sidebar__button mb-6 ms-4"
          onClick={()=> {
            log_out();
          }}
          >
          Log Out 
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
