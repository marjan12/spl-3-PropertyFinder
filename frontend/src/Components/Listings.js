import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
// React leaflet
import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// MUI
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Checkbox } from "@mui/material";

import RoomIcon from "@mui/icons-material/Room";

// Map icons
import apartmentIconPng from "./Assets/Mapicons/apartment.png";
import houseIconPng from "./Assets/Mapicons/house.png";
import officeIconPng from "./Assets/Mapicons/office.png";
// Assets

const divisionsOptions = [
  {
    value: "",
    label: "Overall country",
  },
  {
    value: "Dhaka",
    label: "Dhaka",
  },
  {
    value: "Barishal",
    label: "Barishal",
  },
  {
    value: "Khulna",
    label: "Khulna",
  },
  {
    value: "Rajshahi",
    label: "Rajshahi",
  },
  {
    value: "Chattogram",
    label: "Chattogram",
  },
  {
    value: "Rangpur",
    label: "Rangpur",
  },
  {
    value: "Mymensingh",
    label: "Mymensingh",
  },
  {
    value: "Sylhet",
    label: "Sylhet",
  },
];

function Listings() {
  const [advanceSearch, setAdvanceSearch] = useState(false);

  const navigate = useNavigate();
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  });

  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40, 40],
  });

  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40, 40],
  });

  const initialState = {
    mapInstance: null,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "getMap":
        draft.mapInstance = action.mapData;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  function TheMapComponent() {
    const map = useMap();
    dispatch({ type: "getMap", mapData: map });
    return null;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [propertyStatusFilter, setPropertyStatusFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");

  const [minPriceFilter, setMinPriceFilter] = useState("");

  const [maxPriceFilter, setMaxPriceFilter] = useState("");

  const [isFurnishedFilter, setIsFurnishedFilter] = useState(false);

  const [isPoolFilter, setIsPoolFilter] = useState(false);

  const [isElevatorFilter, setIsElevatorFilter] = useState(false);

  const [isCctvFilter, setIsCctvFilter] = useState(false);

  const [isParkingFilter, setIsParkingFilter] = useState(false);

  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  console.log("allListings", allListings);
  let filteredListing = allListings?.filter((listing) =>
    listing?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (propertyStatusFilter) {
    filteredListing = filteredListing?.filter(
      (listing) =>
        listing?.property_status?.toLowerCase() === propertyStatusFilter
    );
  }

  if (divisionFilter) {
    filteredListing = filteredListing?.filter(
      (listing) =>
        listing?.borough?.toLowerCase() === divisionFilter.toLocaleLowerCase()
    );
  }

  if (typeFilter) {
    filteredListing = filteredListing?.filter(
      (listing) =>
        listing?.listing_type?.toLowerCase() === typeFilter.toLocaleLowerCase()
    );
  }

  if (roomFilter) {
    filteredListing = filteredListing?.filter(
      (listing) => listing?.rooms >= roomFilter
    );
  }

  if (minPriceFilter) {
    const minPrice = parseInt(minPriceFilter) || 0;
    filteredListing = filteredListing?.filter(
      (listing) => listing?.price >= minPrice
    );
  }

  if (maxPriceFilter) {
    const maxPrice = parseInt(maxPriceFilter) || Infinity;
    filteredListing = filteredListing?.filter(
      (listing) => listing?.price <= maxPrice
    );
  }

  if (isFurnishedFilter) {
    filteredListing = filteredListing?.filter(
      (listing) => listing?.furnished === isFurnishedFilter
    );
  }

  if (isPoolFilter) {
    filteredListing = filteredListing?.filter(
      (listing) => listing?.pool === isPoolFilter
    );
  }

  if (isElevatorFilter) {
    filteredListing = filteredListing?.filter(
      (listing) => listing?.elevator === isElevatorFilter
    );
  }

  if (isCctvFilter) {
    filteredListing = filteredListing?.filter(
      (listing) => listing?.cctv === isCctvFilter
    );
  }

  if (isParkingFilter) {
    filteredListing = filteredListing?.filter(
      (listing) => listing?.parking === isParkingFilter
    );
  }

  console.log("filteredListing", filteredListing);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8001/api/listings/",
          { cancelToken: source.token }
        );

        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {}
    }
    GetAllListings();
    return () => {
      source.cancel();
    };
  }, []);

  if (dataIsLoading === true) {
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
    <>
      <div className="" style={{ marginTop: "15px", padding: "25px" }}>
        <div className="title-box-d">
          <h3 className="title-d">
            Search Property ({filteredListing?.length})
          </h3>
        </div>
        <div className="form">
          <div className="form-a">
            <div className="row">
              <div className="col-md-12 mb-1">
                <div className="form-group">
                  <label className="pb-1" for="Type">
                    Keyword
                  </label>
                  <div className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Start typing here to find your property..."
                      aria-label="Search"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        setAdvanceSearch(!advanceSearch);

                        if (advanceSearch) {
                          setPropertyStatusFilter("");
                          setDivisionFilter("");
                          setTypeFilter("");
                          setRoomFilter("");
                          setMinPriceFilter("");
                          setMaxPriceFilter("");
                          setIsFurnishedFilter(false);
                          setIsPoolFilter(false);
                          setIsElevatorFilter(false);
                          setIsCctvFilter(false);
                          setIsParkingFilter(false);
                        }
                      }}
                      className="btn btn-b"
                      style={
                        advanceSearch
                          ? {
                              width: "350px",
                              padding: "0rem 3rem",
                              backgroundColor: "red",
                            }
                          : { width: "350px", padding: "0rem 3rem" }
                      }
                    >
                      {advanceSearch ? "Clear Search" : "Advanced Search"}
                    </button>
                  </div>
                </div>
              </div>
              {advanceSearch && (
                <>
                  <div className="col-md-6 mb-1">
                    <div className="form-group mt-3">
                      <label className="pb-2" for="Type">
                        Property status
                      </label>
                      <select
                        className="form-control form-select form-control-a"
                        id="Type"
                        onChange={(e) =>
                          setPropertyStatusFilter(e.target.value)
                        }
                      >
                        <option value="">Any</option>
                        <option value="rent">For Rent</option>
                        <option value="sale">For Sale</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 mb-1">
                    <div className="form-group mt-3">
                      <label className="pb-2" for="city">
                        City
                      </label>
                      <select
                        className="form-control form-select form-control-a"
                        id="city"
                        onChange={(e) => setDivisionFilter(e.target.value)}
                      >
                        {divisionsOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 mb-1">
                    <div className="form-group mt-3">
                      <label className="pb-2" for="bedrooms">
                        Property Type
                      </label>
                      <select
                        className="form-control form-select form-control-a"
                        id="bedrooms"
                        onChange={(e) => setTypeFilter(e.target.value)}
                      >
                        <option value="">Any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house"> House </option>
                        <option value="office"> Office </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 mb-1">
                    <div className="form-group mt-3">
                      <label className="pb-2" for="Rooms">
                        Minimum Rooms
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Rooms"
                        value={roomFilter}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setRoomFilter("");
                          } else if (/^\d+$/.test(value)) {
                            setRoomFilter(value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-1">
                    <div className="form-group mt-3">
                      <label className="pb-2" for="minPriceFilter">
                        Min Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="minPriceFilter"
                        value={minPriceFilter}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setMinPriceFilter("");
                          } else if (/^\d+$/.test(value)) {
                            setMinPriceFilter(value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-1">
                    <div className="form-group mt-3">
                      <label className="pb-2" for="maxPriceFilter">
                        Max Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="maxPriceFilter"
                        value={maxPriceFilter}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setMaxPriceFilter("");
                          } else if (/^\d+$/.test(value)) {
                            setMaxPriceFilter(value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-1">
                    <div className="form-group mt-3">
                      <Grid
                        item
                        container
                        justifyContent="space-between"
                        style={{ backgroundColor: "#d3d3d3", padding: ".5rem" }}
                      >
                        <Grid item xs={2} sx={{ marginTop: "1rem" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isFurnishedFilter}
                                onChange={(e) =>
                                  setIsFurnishedFilter(e.target.checked)
                                }
                              />
                            }
                            label="Furnished"
                          />
                        </Grid>

                        <Grid item xs={2} sx={{ marginTop: "1rem" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isPoolFilter}
                                onChange={(e) =>
                                  setIsPoolFilter(e.target.checked)
                                }
                              />
                            }
                            label="Pool"
                          />
                        </Grid>

                        <Grid item xs={2} sx={{ marginTop: "1rem" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isElevatorFilter}
                                onChange={(e) =>
                                  setIsElevatorFilter(e.target.checked)
                                }
                              />
                            }
                            label="Elevator"
                          />
                        </Grid>

                        <Grid item xs={2} sx={{ marginTop: "1rem" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isCctvFilter}
                                onChange={(e) =>
                                  setIsCctvFilter(e.target.checked)
                                }
                              />
                            }
                            label="Cctv"
                          />
                        </Grid>

                        <Grid item xs={2} sx={{ marginTop: "1rem" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isParkingFilter}
                                onChange={(e) =>
                                  setIsParkingFilter(e.target.checked)
                                }
                              />
                            }
                            label="Parking"
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Grid
        container
        spacing={2}
        style={{ padding: "1rem", paddingTop: "0rem" }}
      >
        <Grid item xs={6}>
          <Grid container>
            {filteredListing.map((listing) => (
              <Grid item xs={6} key={listing.id}>
                <Card
                  style={{
                    margin: ".5rem",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",

                    position: "relative",
                  }}
                >
                  <CardHeader
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={() =>
                          state.mapInstance.flyTo(
                            [listing.latitude, listing.longitude],
                            16
                          )
                        }
                      >
                        <RoomIcon />
                      </IconButton>
                    }
                    title={
                      listing.title.length > 15
                        ? listing.title.substring(0, 15) + "..."
                        : listing.title
                    }
                  />
                  <CardMedia
                    style={{
                      // paddingRight: "1rem",
                      // paddingLeft: "1rem",
                      height: "12rem",
                      cursor: "pointer",
                    }}
                    component="img"
                    image={listing.picture1}
                    alt={listing.title}
                    onClick={() => navigate(`/listings/${listing.id}`)}
                  />
                  <CardContent>
                    <Typography variant="body2">
                      {listing.description.substring(0, 150)}...
                    </Typography>
                  </CardContent>

                  {listing.property_status === "Sale" ? (
                    <Typography
                      style={{
                        position: "absolute",
                        backgroundColor: "green",
                        zIndex: "1000",
                        color: "white",
                        top: "100px",

                        padding: "5px",
                      }}
                    >
                      {listing.listing_type}: $
                      {listing.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                  ) : (
                    <Typography
                      style={{
                        position: "absolute",
                        backgroundColor: "green",
                        zIndex: "1000",
                        color: "white",
                        top: "100px",
                        padding: "5px",
                      }}
                    >
                      {listing.listing_type}: $
                      {listing.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      / {listing.rental_frequency}
                    </Typography>
                  )}

                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      {listing.seller_agency_name}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            marginTop: "0.5rem",
          }}
        >
          <AppBar position="sticky">
            <div
              style={{
                height: "100vh",
              }}
            >
              <MapContainer
                center={[23.685, 90.3563]} // Coordinates for Dhaka, Bangladesh
                zoom={7}
                scrollWheelZoom={true}
                minZoom={7}
                maxBounds={[
                  [20.55, 88.01],
                  [26.63, 92.67],
                ]} // Bounding box for Bangladesh
                maxBoundsViscosity={1.0} // Ensures the map cannot be dragged outside the bounds
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <TheMapComponent />

                {filteredListing.map((listing) => {
                  function IconDisplay() {
                    if (listing.listing_type === "House") {
                      return houseIcon;
                    } else if (listing.listing_type === "Apartment") {
                      return apartmentIcon;
                    } else if (listing.listing_type === "Office") {
                      return officeIcon;
                    }
                  }
                  return (
                    <Marker
                      key={listing.id}
                      icon={IconDisplay()}
                      position={[listing.latitude, listing.longitude]}
                    >
                      <Popup>
                        <Typography variant="h5">
                          {listing.title.substring(0, 10)}..
                        </Typography>
                        <img
                          src={listing.picture1}
                          style={{
                            height: "14rem",
                            width: "18rem",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/listings/${listing.id}`)}
                        />
                        <Typography variant="body1">
                          {listing.description.substring(0, 150)}...
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => navigate(`/listings/${listing.id}`)}
                        >
                          Details
                        </Button>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </AppBar>
        </Grid>
      </Grid>
    </>
  );
}

export default Listings;
