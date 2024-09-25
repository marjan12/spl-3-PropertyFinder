import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// MUI
import {
  Grid,
  AppBar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  CardActions,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function AgencyDetail() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const params = useParams();

  const initialState = {
    userProfile: {
      agencyName: "",
      phoneNumber: "",
      profilePic: "",
      bio: "",
      sellerListings: [],
    },
    dataIsLoading: true,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.bio = action.profileObject.bio;
        draft.userProfile.sellerListings = action.profileObject.seller_listings;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8001/api/profiles/${params.id}/`
        );

        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) {}
    }
    GetProfileInfo();
  }, []);

  if (state.dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div>
      <section class="intro-single" style={{ paddingTop: "2rem" }}>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-8">
              <div class="title-single-box">
                <h1 class="title-single">
                  {state.userProfile.sellerListings.length} properties
                </h1>
                <span class="color-text-a">
                  By {state.userProfile.agencyName}
                </span>
              </div>
            </div>
            <div class="col-md-12 col-lg-4">
              <nav
                aria-label="breadcrumb"
                class="breadcrumb-box d-flex justify-content-lg-end"
              >
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Agents</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    {state.userProfile.agencyName}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="section-property section-t2">
        <div className="container">
          <div className="row">
            <div
              class="col-sm-12"
              style={{
                borderRadius: "10px",
                padding: "1rem",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              }}
            >
              <div class="row">
                <div class="col-md-6">
                  <div class="agent-avatar-box">
                    <img
                      src={
                        state.userProfile.profilePic !== null
                          ? state.userProfile.profilePic
                          : defaultProfilePicture
                      }
                      alt=""
                      class="agent-avatar img-fluid"
                      style={{ height: "20rem", width: "100%" }}
                    />
                  </div>
                </div>
                <div class="col-md-5 section-md-t3">
                  <div class="agent-info-box">
                    <div class="agent-title">
                      <div class="title-box-d">
                        <h3 class="title-d">{state.userProfile.agencyName}</h3>
                      </div>
                    </div>
                    <div class="agent-content mb-3">
                      <p class="content-d color-text-a">
                        {state.userProfile.bio}
                      </p>
                      <div class="info-agents color-a">
                        <p>
                          <strong>Phone: </strong>
                          <span class="color-text-a">
                            {" "}
                            {state.userProfile.phoneNumber}{" "}
                          </span>
                        </p>

                        <p>
                          <strong>Email: </strong>
                          <span class="color-text-a"> agents@example.com</span>
                        </p>
                      </div>
                    </div>
                    <div class="socials-footer">
                      <ul class="list-inline">
                        <li class="list-inline-item">
                          <a href="#" class="link-one">
                            <i class="bi bi-facebook" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a href="#" class="link-one">
                            <i class="bi bi-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a href="#" class="link-one">
                            <i class="bi bi-instagram" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a href="#" class="link-one">
                            <i class="bi bi-linkedin" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 section-t4">
              <div
                className="title-wrap d-flex justify-content-between "
                style={{ paddingBottom: "1.5rem" }}
              >
                <div className="title-box">
                  <h2 className="title-a">My Properties</h2>
                </div>
                <div className="title-link">
                  <Link to={"/listings"}>
                    See all properties
                    <span className="bi bi-chevron-right"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            {state.userProfile.sellerListings.map((listing) => (
              <div className="col-md-4" key={listing.id}>
                <div className="card-box-a card-shadow">
                  <div className="img-box-a">
                    <img
                      src={
                        listing.picture1
                          ? `http://127.0.0.1:8001${listing.picture1}`
                          : defaultProfilePicture
                      }
                      alt=""
                      className="img-a img-fluid"
                      style={{ height: "350px", width: "100%" }}
                    />
                  </div>
                  <div className="card-overlay">
                    <div className="card-overlay-a-content">
                      <div className="card-header-a">
                        <h2 className="card-title-a">
                          <a href="#">
                            {listing.title.length > 15
                              ? listing.title.substring(0, 15) + "..."
                              : listing.title}{" "}
                          </a>
                        </h2>
                      </div>
                      <div className="card-body-a">
                        <div className="price-box d-flex">
                          <span className="price-a">
                            {listing.property_status === "Sale"
                              ? listing.listing_type +
                                ":" +
                                "$" +
                                listing.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : listing.listing_type +
                                ":" +
                                "$ " +
                                listing.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                "/ " +
                                listing.rental_frequency}
                          </span>
                        </div>
                        <Link to={`/listings/${listing.id}`} className="link-a">
                          Click here to view
                          <span className="bi bi-chevron-right"></span>
                        </Link>
                      </div>
                      <div className="card-footer-a">
                        <ul className="card-info d-flex justify-content-around">
                          <li>
                            <h4 className="card-info-title">Furnished</h4>
                            <span>{listing.furnished ? "Yes" : "No"}</span>
                          </li>
                          <li>
                            <h4 className="card-info-title">Pool</h4>
                            <span>{listing.pool ? "Yes" : "No"}</span>
                          </li>
                          <li>
                            <h4 className="card-info-title">Elevator</h4>
                            <span>{listing.elevator ? "Yes" : "No"}</span>
                          </li>
                          <li>
                            <h4 className="card-info-title">Cctv</h4>
                            <span>{listing.cctv ? "Yes" : "No"}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AgencyDetail;
