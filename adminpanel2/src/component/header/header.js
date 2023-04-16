import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIRoutes } from "../../constant/api_url";

const Header = () => {
  const navigate = useNavigate();
  const admin_loginInfo = JSON.parse(localStorage.getItem("Login_info"));
  console.log(admin_loginInfo, "cart");
  const logout = () => {
    localStorage.removeItem("Login_info");
    if (admin_loginInfo.length > 0) {
      navigate("/");
    }
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo mr-5" to="/home">
            <img
              src={`${APIRoutes.APIHOSTNAME}logoimages/${admin_loginInfo[0].logo}`}
              className="mr-2"
              alt="logo"
              style={{ height: "90px",padding:"10px" }}
            />
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/home">
            <img src="images/logo-mini.svg" alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize "
          >
            <span className="icon-menu" />
          </button>
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div
                  className="input-group-prepend hover-cursor"
                  id="navbar-search-icon"
                >
                  {/* <span className="input-group-text" id="search">
                    <i className="icon-search" />
                  </span> */}
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="navbar-search-input"
                  // placeholder="Search now"
                  aria-label="search"
                  aria-describedby="search"
                />
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            {/* <li className="nav-item dropdown">
              <Link
                className="nav-link count-indicator dropdown-toggle"
                id="notificationDropdown"
                data-toggle="dropdown"
              >
                <i className="icon-bell mx-0" />
                <span className="count" />
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header">
                  Notifications
                </p>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="ti-info-alt mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Application Error
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>
                </Link>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="ti-settings mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Settings
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Private message
                    </p>
                  </div>
                </Link>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="ti-user mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      New user registration
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      2 days ago
                    </p>
                  </div>
                </Link>
              </div>
            </li> */}
            <li className="nav-item nav-profile dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                id="profileDropdown"
              >
                <img
                  src={`${APIRoutes.APIHOSTNAME}logoimages/${admin_loginInfo[0].admin_image}`}
                  alt="profile"
                />
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <Link className="dropdown-item" to="/profileData">
                  <i className="ti-settings text-primary" />
                  Profile
                </Link>
                <Link className="dropdown-item" onClick={() => logout()}>
                  <i className="ti-power-off text-primary" />
                  {/* <button onClick={()=>logout()}> */}
                  Logout
                  {/* </button> */}
                </Link>
              </div>
            </li>
            {/* <li className="nav-item nav-settings d-none d-lg-flex">
              <Link className="nav-link">
                <i className="icon-ellipsis" />
              </Link>
            </li> */}
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="icon-menu" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
