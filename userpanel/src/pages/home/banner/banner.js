import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Gold from "./gold";

const Banner = () => {
  const navigate = useNavigate();
  // const [showGold,setShowGold] = useState(false);
  // const handleClick = () => {
  //   setShowGold(true);
  // }
  return (
    <>
      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="p-b-10">
            <h3
              className="ltext-103 cl5"
              style={{ textAlign: "center", marginBottom: "50px" }}
            >
              Shop By Category
            </h3>
          </div>
          <div className="row">
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              {/* Block1 */}

              <div className="block1 wrap-pic-w">
                <img src="images/banner/allJwelleryImage.png" alt="IMG-BANNER" style={{height:'425px'}}/>
                <Link
                  to="/"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      All Jewellery
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      Spring 2023
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      <Link style={{ color: "white" }} to="/shop">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              {/* Block1 */}

              <div className="block1 wrap-pic-w">
                <img src="images/banner/banner3.jpg" alt="IMG-BANNER" />
                <Link
                  to="/"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Gold
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      Spring 2023
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      <Link style={{ color: "white" }} to="/gold">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              {/* Block1 */}

              <div className="block1 wrap-pic-w">
                <img src="images/banner/banner5.png" alt="IMG-BANNER" style={{height:'425px'}}/>
                <Link
                  to="/"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Silver
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      Spring 2023
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      <Link style={{ color: "white" }} to="/silver">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
