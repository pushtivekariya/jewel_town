import React from "react";
import { Link } from "react-router-dom";
// import Quick_view from '../../pages/quickView/quick_view'
import "./footer.css";

// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const Footer = () => {
  return (
    <>
      <footer className="bg3 p-t-75 p-b-32" style={{paddingTop:"35px" }}>
        <div className="container">
          <div className="row" style={{ marginBottom: "0px" }}>
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Quick Links</h4>
              <ul>
                <li className="p-b-10">
                  <Link to="/" className="stext-107 cl7 hov-cl1 trans-04">
                    Home
                  </Link>
                </li>
                <li className="p-b-10">
                  <Link to="/shop" className="stext-107 cl7 hov-cl1 trans-04">
                    Shop
                  </Link>
                </li>
                <li className="p-b-10">
                  <Link
                    to="/bespoke"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Bespoke
                  </Link>
                </li>
                <li className="p-b-10">
                  <Link to="/about" className="stext-107 cl7 hov-cl1 trans-04">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Shop By Category</h4>
              <ul>
                <li className="p-b-10">
                  <Link to="/shop" className="stext-107 cl7 hov-cl1 trans-04">
                    All Jewellary
                  </Link>
                </li>
                <li className="p-b-10">
                  <Link to="/gold" className="stext-107 cl7 hov-cl1 trans-04">
                    Gold
                  </Link>
                </li>
                <li className="p-b-10">
                  <Link to="/silver" className="stext-107 cl7 hov-cl1 trans-04">
                    Silver
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">GET IN TOUCH</h4>
              <p className="stext-107 cl7 size-201">
                Any questions? Let us know in store at 8th floor, 855 Avadh Utopia,
                Vesu, Surat , Gujarat or call us on (+91) 96716 96879
              </p>
              {/* <div className="p-t-27">
                <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i className="fa fa-pinterest-p" />
                </a>
              </div> */}
            </div>
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Newsletter</h4>
              <form>
                <div className="wrap-input1 w-full p-b-4">
                  <input
                    className="input1 bg-none plh1 stext-107 cl7"
                    type="text"
                    name="email"
                    placeholder="email@example.com"
                  />
                  <div className="focus-input1 trans-04" />
                </div>
                <div className="p-t-18">
                  <button className="flex-c-m stext-101 cl0 size-103  bor1 hov-btn2 p-lr-15 trans-04" style={{background:"#c39587"}}>
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="p-t-40" style={{paddingTop:"10px"}}>
            <p className="stext-107 cl6 txt-center">
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © 2023 All rights reserved | Made with{" "}
              <i className="fa fa-heart-o" aria-hidden="true" /> by Jewel Town
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </footer>

      {/* Site footer */}
      {/* <footer className="site-footer">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h6>About</h6>
          <p className="text-justify">
            Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative to
            help the upcoming programmers with the code. Scanfcode focuses on
            providing the most efficient code or snippets as the code wants to
            be simple. We will help programmers build up concepts in different
            programming languages that include C, C++, Java, HTML, CSS,
            Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.
          </p>
        </div>
        <div className="col-xs-6 col-md-3">
          <h6>Categories</h6>
          <ul className="footer-links">
            <li>
              <a href="http://scanfcode.com/category/c-language/">C</a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/front-end-development/">
                UI Design
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/back-end-development/">
                PHP
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/java-programming-language/">
                Java
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/android/">Android</a>
            </li>
            <li>
              <a href="http://scanfcode.com/category/templates/">Templates</a>
            </li>
          </ul>
        </div>
        <div className="col-xs-6 col-md-3">
          <h6>Quick Links</h6>
          <ul className="footer-links">
            <li>
              <a href="http://scanfcode.com/about/">About Us</a>
            </li>
            <li>
              <a href="http://scanfcode.com/contact/">Contact Us</a>
            </li>
            <li>
              <a href="http://scanfcode.com/contribute-at-scanfcode/">
                Contribute
              </a>
            </li>
            <li>
              <a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a>
            </li>
            <li>
              <a href="http://scanfcode.com/sitemap/">Sitemap</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-sm-6 col-xs-12">
          <p className="copyright-text">
            Copyright © 2017 All Rights Reserved by
            <a href="#">Scanfcode</a>.
          </p>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <ul className="social-icons">
            <li>
              <a className="facebook" href="#">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a className="twitter" href="#">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a className="dribbble" href="#">
                <i className="fa fa-dribbble" />
              </a>
            </li>
            <li>
              <a className="linkedin" href="#">
                <i className="fa fa-linkedin" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer> */}
    </>
  );
};

export default Footer;
