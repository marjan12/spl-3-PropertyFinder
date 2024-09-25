import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// MUI imports
import {
  Button,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";

// Contexts
import StateContext from "../Contexts/StateContext";
import DispatchContext from "../Contexts/DispatchContext";

// Components
import CustomCard from "./CustomCard";

function Header() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function HandleProfile() {
    setAnchorEl(null);
    navigate("/profile");
  }

  const [openSnack, setOpenSnack] = useState(false);

  async function HandleLogout() {
    setAnchorEl(null);
    const confirmLogout = window.confirm("Are you sure you want to leave?");
    if (confirmLogout) {
      try {
        const response = await Axios.post(
          "http://127.0.0.1:8001/api-auth-djoser/token/logout/",
          GlobalState.userToken,
          { headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
        );

        GlobalDispatch({ type: "logout" });
        setOpenSnack(true);
        navigate("/");
      } catch (e) {}
    }
  }

  useEffect(() => {
    if (openSnack) {
      setTimeout(() => {
        setOpenSnack(false);
      }, 1500);
    }
  }, [openSnack]);

  return (
    <>
      <nav className="navbar navbar-default navbar-trans navbar-expand-lg">
        <div className="container">
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarDefault"
            aria-controls="navbarDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link className="navbar-brand text-brand" to={"/"}>
            Property<span className="color-b">Finder</span>
          </Link>

          <div
            className="navbar-collapse collapse justify-content-center"
            id="navbarDefault"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="nav-link "
                  onClick={() => navigate("/listings")}
                >
                  Properties
                </button>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/agencies"}>
                  Agencies
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to={"/addproperty"}>
                  Add Property
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to={"/contact"}>
                  Contact
                </Link>
              </li>
            </ul>
            <div style={{ marginLeft: "9rem" }}>
              {GlobalState.userIsLogged ? (
                <div className="dropdown" style={{ marginLeft: "1rem" }}>
                  <a
                    className="nav-item  nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    {GlobalState.userUsername}
                  </a>
                  <div className="dropdown-menu" style={{ zIndex: "99999" }}>
                    <Link className="dropdown-item " to={"/profile"}>
                      Profile
                    </Link>
                    <button
                      className="dropdown-item "
                      onClick={HandleLogout}
                      style={{
                        //on hover do text color red
                        ":hover": {
                          color: "red",
                        },
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link className=" nav-item nav-link " to={"/login"}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Snackbar
        open={openSnack}
        message="You have successfully logged out!"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </>
  );
}

export default Header;
