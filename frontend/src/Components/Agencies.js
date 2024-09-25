import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// Components
import ProfileUpdate from "./ProfileUpdate";

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
  CardActions,
} from "@mui/material";

function Agencies() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    dataIsLoading: true,
    agenciesList: [],
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchAgencies":
        draft.agenciesList = action.agenciesArray;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get all profiles
  useEffect(() => {
    async function GetAgencies() {
      try {
        const response = await Axios.get(`http://127.0.0.1:8001/api/profiles/`);

        dispatch({
          type: "catchAgencies",
          agenciesArray: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) {}
    }
    GetAgencies();
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

  // return (
  //   <Grid
  //     container
  //     justifyContent="flex-start"
  //     spacing={2}
  //     style={{ padding: "10px" }}
  //   >
  //     {state.agenciesList.map((agency) => {
  //       function PropertiesDisplay() {
  //         if (agency.seller_listings.length === 0) {
  //           return (
  //             <Button disabled size="small">
  //               No Property
  //             </Button>
  //           );
  //         } else if (agency.seller_listings.length === 1) {
  //           return (
  //             <Button
  //               size="small"
  //               onClick={() => navigate(`/agencies/${agency.seller}`)}
  //             >
  //               One Property listed
  //             </Button>
  //           );
  //         } else {
  //           return (
  //             <Button
  //               size="small"
  //               onClick={() => navigate(`/agencies/${agency.seller}`)}
  //             >
  //               {agency.seller_listings.length} Properties
  //             </Button>
  //           );
  //         }
  //       }

  //       if (agency.agency_name && agency.phone_number)
  //         return (
  //           <Grid
  //             key={agency.id}
  //             item
  //             style={{ marginTop: "1rem", maxWidth: "20rem" }}
  //           >
  //             <Card>
  //               <CardMedia
  //                 component="img"
  //                 height="140"
  //                 image={
  // agency.profile_picture
  //   ? agency.profile_picture
  //   : defaultProfilePicture
  //                 }
  //                 alt="Profile Picture"
  //               />
  //               <CardContent>
  //                 <Typography gutterBottom variant="h5" component="div">
  //                   {agency.agency_name}
  //                 </Typography>
  //                 <Typography variant="body2" color="text.secondary">
  //                   {agency.bio.substring(0, 100)}...
  //                 </Typography>
  //               </CardContent>
  //               <CardActions>{PropertiesDisplay()}</CardActions>
  //             </Card>
  //           </Grid>
  //         );
  //     })}
  //   </Grid>
  // );

  return (
    <>
      <section class="intro-single" style={{ paddingTop: "3rem" }}>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-8">
              <div class="title-single-box">
                <h1 class="title-single">Our Amazing Agents</h1>
                <span class="color-text-a"> Find your next property </span>
              </div>
            </div>
            <div class="col-md-12 col-lg-4">
              <nav
                aria-label="breadcrumb"
                class="breadcrumb-box d-flex justify-content-lg-end"
              >
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Agents Grid
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section class="agents-grid grid">
        <div class="container">
          <div class="row">
            {state.agenciesList.map((agency) => {
              function PropertiesDisplay() {
                if (agency.seller_listings.length === 0) {
                  return (
                    <Button disabled size="small">
                      No Property
                    </Button>
                  );
                } else if (agency.seller_listings.length === 1) {
                  return (
                    <Button
                      size="small"
                      onClick={() => navigate(`/agencies/${agency.seller}`)}
                    >
                      One Property listed
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      size="small"
                      onClick={() => navigate(`/agencies/${agency.seller}`)}
                    >
                      {agency.seller_listings.length} Properties
                    </Button>
                  );
                }
              }

              return (
                <div className="col-md-4" key={agency.id}>
                  <div className="card-box-d">
                    <div className="card-img-d">
                      <img
                        src={
                          agency.profile_picture
                            ? agency.profile_picture
                            : defaultProfilePicture
                        }
                        alt=""
                        className="img-d img-fluid"
                        style={{ height: "auto", width: "100%" }}
                      />
                    </div>
                    <div className="card-overlay card-overlay-hover">
                      <div className="card-header-d">
                        <div className="card-title-d align-self-center">
                          <h3 className="title-d">
                            <Link
                              to={`/agencies/${agency.id}`}
                              className="link-two"
                            >
                              {agency.agency_name}
                            </Link>
                          </h3>
                        </div>
                      </div>
                      <div className="card-body-d">
                        <p className="content-d color-text-a">{agency.bio}</p>
                        <div className="info-agents color-a">
                          <p>
                            <strong>Phone: </strong> {agency.phone_number}
                          </p>
                          <p>
                            <strong>Total Number of properties: </strong>{" "}
                            {agency.seller_listings.length}
                          </p>
                        </div>
                      </div>
                      <div className="card-footer-d">
                        <div className="socials-footer d-flex justify-content-center">
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <a href="#" className="link-one">
                                <i
                                  className="bi bi-facebook"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a href="#" className="link-one">
                                <i
                                  className="bi bi-twitter"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a href="#" className="link-one">
                                <i
                                  className="bi bi-instagram"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a href="#" className="link-one">
                                <i
                                  className="bi bi-linkedin"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Agencies;
