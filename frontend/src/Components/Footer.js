import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ marginTop: "2rem" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="nav-footer">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/listings">Property</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/addproperty">Add Property</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/agencies">Agenciy</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
            <div className="socials-a">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="bi bi-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="bi bi-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="bi bi-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="bi bi-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="copyright-footer">
              <p className="copyright color-text-a">
                &copy; Noakhali science and technology university
              </p>
            </div>
            <div className="credits">Designed by Marjan Mitu</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
