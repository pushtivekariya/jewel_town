import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { getproddataapi } from "../../../api/common_api";
import { APIRoutes } from "../../../constant/api_url";
const ProdSlide = () => {
  const [proddata, setproddata] = useState([]);

  const getProdListfunc = async () => {
    const response = await getproddataapi();
    setproddata(response.result);
  };

  useEffect(() => {
    getProdListfunc();
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      // partialVisibilityGutter: 100
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <h2 className="text-center font-weight-bold" style={{marginBottom:"60px"}}>ALL  PRODUCTS</h2>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1000}
        transitionDuration={1000}
        infinite={true}
        arrows={false}
        stopOnHover={false}
        pauseOnHover={false}
      >
        {proddata?.map((product) => {
          return (
            <>
              <div
                className="cards"
                style={{  background: "none",marginRight:"20px" }}
              >
                <div >
                  <div>
                  <Link to="/productdata">

                    <img
                      style={{ height: "300px",marginLeft:"20px" }}
                      className="product--image"
                      src={`${APIRoutes.APIHOSTNAME}images/${product.image_url}`}
                      alt="product-images"
                    />
                  </Link>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#c39587",
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      width: "300px",
                      marginLeft:"20px"
                    }}
                  >
                  <h5>Product Id : {product.product_id}</h5>
                    <h5>{product.short_description}</h5>
                    <h5 className="price">price: {product.price}</h5>
                    <p>Quantity : {product.quantity}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </Carousel>
    </>
  );
};

export default ProdSlide;
