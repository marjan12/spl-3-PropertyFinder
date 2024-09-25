import { CircularProgress, Grid } from "@mui/material";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [dataIsLoading, setDataIsLoading] = useState(false);

  const handleClick = async () => {
    if (!name || !email || !subject || !message) {
      alert("Please fill in all the fields.");
      return;
    }
    setDataIsLoading(true);
    try {
      const response = await Axios.post("http://127.0.0.1:8001/api/contact/", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      });

      setDataIsLoading(false);

      if (response.status === 201) {
        alert("Contact saved successfully.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }

      // Handle the response as needed
      console.log("Contact saved successfully:", response.data);
    } catch (error) {
      console.log("An error occurred:", error);
      setDataIsLoading(false);
    }
  };

  return (
    <div>
      <section className="intro-single" style={{ paddingTop: "60px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">Contact US</h1>
                <span className="color-text-a">
                  We are here to help you connect with the causes that matter
                  most. Whether you have questions about our services, need
                  assistance with your donation, or just want to learn more
                  about how you can make a difference, our team is ready to
                  support you every step of the way. Your voice and your
                  generosity are vital to our mission, and we’re committed to
                  ensuring you have a seamless and rewarding experience. Reach
                  out to us, and together, let's make a positive impact on the
                  Bangladesh.
                </span>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-box d-flex justify-content-lg-end"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="contact-map box">
                <div id="map" className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.292860286448!2d91.1001958745572!3d22.791609779336387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754af712aaac0b7%3A0x4bab3d112f6b6f3f!2sNoakhali%20Science%20and%20Technology%20University!5e0!3m2!1sen!2sbd!4v1723205576207!5m2!1sen!2sbd"
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-sm-12 section-t8">
              <div className="row">
                <div className="col-md-7">
                  <div className="php-email-form">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control form-control-lg form-control-a"
                            placeholder="Your Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <input
                            name="email"
                            type="email"
                            className="form-control form-control-lg form-control-a"
                            placeholder="Your Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <input
                            type="text"
                            name="subject"
                            className="form-control form-control-lg form-control-a"
                            placeholder="Subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            name="message"
                            className="form-control"
                            cols="45"
                            rows="8"
                            placeholder="Message"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12 my-3">
                        <div className="mb-3"></div>
                      </div>

                      <div className="col-md-12 text-center">
                        <button className="btn btn-a" onClick={handleClick}>
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 section-md-t3">
                  <div className="icon-box section-b2">
                    <div className="icon-box-icon">
                      <span className="bi bi-envelope"></span>
                    </div>
                    <div className="icon-box-content table-cell">
                      <div className="icon-box-title">
                        <h4 className="icon-title">Say Hello</h4>
                      </div>
                      <div className="icon-box-content">
                        <p className="mb-1">
                          Email.
                          <span className="color-a">
                            marjan2514@student.nstu.edu.bd
                          </span>
                        </p>
                        <p className="mb-1">
                          Phone.
                          <span className="color-a">0177-12345678</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="icon-box section-b2">
                    <div className="icon-box-icon">
                      <span className="bi bi-geo-alt"></span>
                    </div>
                    <div className="icon-box-content table-cell">
                      <div className="icon-box-title">
                        <h4 className="icon-title">Find us in</h4>
                      </div>
                      <div className="icon-box-content">
                        <p className="mb-1">
                          Noakhali Science and Technology University
                          <br /> Sonapur, Noakhali, Bangladesh.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="icon-box">
                    <div className="icon-box-icon">
                      <span className="bi bi-share"></span>
                    </div>
                    <div className="icon-box-content table-cell">
                      <div className="icon-box-title">
                        <h4 className="icon-title">Social networks</h4>
                      </div>
                      <div className="icon-box-content">
                        <div className="socials-footer">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
