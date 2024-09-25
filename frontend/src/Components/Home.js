import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/img/slide-1.jpg";
import img2 from "../assets/img/slide-2.jpg";
import img3 from "../assets/img/slide-3.jpg";
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

import { CircularProgress, Grid } from "@mui/material";
import useScript from "../hooks/useScript";

function Home() {
  // useScript("/assets/vendor/bootstrap/js/bootstrap.bundle.min.js");
  // useScript("/assets/vendor/swiper/swiper-bundle.min.js");
  // useScript("/assets/js/main.js");

  const [dataIsLoading, setDataIsLoading] = useState();
  const [allListings, setAllListings] = useState([]);
  const [allAgencies, setAllAgencies] = useState([]);

  useEffect(() => {
    const source = Axios.CancelToken.source();

    setDataIsLoading(true);
    async function GetAgencies() {
      try {
        const response = await Axios.get(`http://127.0.0.1:8001/api/profiles/`);

        console.log("agency", response.data);
        setAllAgencies(response.data);
        setDataIsLoading(false);
      } catch (e) {}
    }
    GetAgencies();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    setDataIsLoading(true);

    async function GetAllListings() {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8001/api/listings/",
          { cancelToken: source.token }
        );

        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error);
      }
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
      {/* <!-- ======= Intro Section ======= --> */}
      <div className="intro intro-carousel swiper position-relative">
        <div className="swiper-wrapper">
          <div
            className="swiper-slide carousel-item-a intro-item bg-image"
            style={{ backgroundImage: `url(${img1})` }}
          >
            <div className="overlay overlay-a"></div>
            <div className="intro-content display-table">
              <div className="table-cell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="intro-body">
                        <p className="intro-title-top">
                          Doral, Florida
                          <br /> 78345
                        </p>
                        <h1 className="intro-title mb-4 ">
                          <span className="color-b">204 </span> Mount
                          <br /> Olive Road Two
                        </h1>
                        <p className="intro-subtitle intro-price">
                          <a href="#">
                            <span className="price-a">rent | $ 12.000</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="swiper-slide carousel-item-a intro-item bg-image"
            style={{ backgroundImage: `url(${img2})` }}
          >
            <div className="overlay overlay-a"></div>
            <div className="intro-content display-table">
              <div className="table-cell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="intro-body">
                        <p className="intro-title-top">
                          Doral, Florida
                          <br /> 78345
                        </p>
                        <h1 className="intro-title mb-4">
                          <span className="color-b">204 </span> Rino
                          <br /> Venda Road Five
                        </h1>
                        <p className="intro-subtitle intro-price">
                          <a href="#">
                            <span className="price-a">rent | $ 12.000</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="swiper-slide carousel-item-a intro-item bg-image"
            style={{ backgroundImage: `url(${img3})` }}
          >
            <div className="overlay overlay-a"></div>
            <div className="intro-content display-table">
              <div className="table-cell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="intro-body">
                        <p className="intro-title-top">
                          Doral, Florida
                          <br /> 78345
                        </p>
                        <h1 className="intro-title mb-4">
                          <span className="color-b">204 </span> Alira
                          <br /> Roan Road One
                        </h1>
                        <p className="intro-subtitle intro-price">
                          <a href="#">
                            <span className="price-a">rent | $ 12.000</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </div>

      {/* <!-- End Intro Section --> */}
      <main id="main">
        <section className="section-property section-t8">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrap d-flex justify-content-between">
                  <div className="title-box">
                    <h2 className="title-a">Latest Properties</h2>
                  </div>
                  <div className="title-link">
                    <Link to={"/listings"}>
                      All Property
                      <span className="bi bi-chevron-right"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Latest Properties */}
            <section className="property-grid grid">
              <div className="container">
                <div className="row">
                  {allListings.slice(0, 6).map((listing) => (
                    <div className="col-md-4" key={listing.id}>
                      <div className="card-box-a card-shadow">
                        <div className="img-box-a">
                          <img
                            src={listing.picture1}
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
                                    : listing.title}
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
                              <Link
                                to={`/listings/${listing.id}`}
                                className="link-a"
                              >
                                Click here to view
                                <span className="bi bi-chevron-right"></span>
                              </Link>
                            </div>
                            <div className="card-footer-a">
                              <ul className="card-info d-flex justify-content-around">
                                <li>
                                  <h4 className="card-info-title">Furnished</h4>
                                  <span>
                                    {listing.furnished ? "Yes" : "No"}
                                  </span>
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
        </section>
        {/* Best Agents */}
        <section className="section-agents section-t8">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrap d-flex justify-content-between">
                  <div className="title-box">
                    <h2 className="title-a">Best Agents</h2>
                  </div>
                  <div className="title-link">
                    <Link to={"/agencies"}>
                      All Agents
                      <span className="bi bi-chevron-right"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {allAgencies.slice(0, 3).map((agency) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-testimonials section-t8 nav-arrow-a">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrap d-flex justify-content-between">
                  <div className="title-box">
                    <h2 className="title-a">Testimonials</h2>
                  </div>
                </div>
              </div>
            </div>

            <div id="testimonial-carousel" className="swiper">
              <div className="swiper-wrapper">
                <div className="carousel-item-a swiper-slide">
                  <div className="testimonials-box">
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div className="testimonial-img">
                          <img
                            src="assets/img/testimonial-1.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <div className="testimonial-ico">
                          <i className="bi bi-chat-quote-fill"></i>
                        </div>
                        <div className="testimonials-content">
                          <p className="testimonial-text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Omnis, cupiditate ea nam praesentium debitis
                            hic ber quibusdam voluptatibus officia expedita
                            corpori.
                          </p>
                        </div>
                        <div className="testimonial-author-box">
                          <img
                            src="assets/img/mini-testimonial-1.jpg"
                            alt=""
                            className="testimonial-avatar"
                          />
                          <h5 className="testimonial-author">Albert & Erika</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="carousel-item-a swiper-slide">
                  <div className="testimonials-box">
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div className="testimonial-img">
                          <img
                            src="assets/img/testimonial-2.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <div className="testimonial-ico">
                          <i className="bi bi-chat-quote-fill"></i>
                        </div>
                        <div className="testimonials-content">
                          <p className="testimonial-text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Omnis, cupiditate ea nam praesentium debitis
                            hic ber quibusdam voluptatibus officia expedita
                            corpori.
                          </p>
                        </div>
                        <div className="testimonial-author-box">
                          <img
                            src="assets/img/mini-testimonial-2.jpg"
                            alt=""
                            className="testimonial-avatar"
                          />
                          <h5 className="testimonial-author">Pablo & Emma</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-carousel-pagination carousel-pagination"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
