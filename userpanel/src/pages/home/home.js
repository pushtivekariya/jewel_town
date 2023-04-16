import React from "react";
import Banner from "./banner/banner";
import Prod from "./product/prod";
import Carousel from "./slider/carousel";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const Home = () => {
  return (
    <>
   {/* <Header/> */}
    <div style={{ overflowX: "hidden" }}>
  
    {/* <Slider2/> */}
      <Carousel />
    {/* <Loginmodal/> */}
      <Banner />
      <Prod />
     
    </div>
 {/* <Footer/> */}
    </>
  );
};

export default Home;
