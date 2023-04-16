import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: false
};

const Carousel = () => {
  return (
    <div className="responsive" >
      <Slider {...settings}>


        {/* <div className="images">
     
         
          <img src="images/slider/sld4.png" alt="Image 1" style={{ height: '100vh' }} />

        </div>
        <div className="images">
        <p  className="ltext-201 cl2 p-t-19 p-b-43 respon1"
         style={{
          // transform: 'translate(-50%,-50%)',
          transition:'opacity 0.5s ease-in-out',
          fontSize:'40px', position: 'absolute', color:'black',margin:'300px  0px  0px 950px',textShadow: '2px 2px 4px #c39584'}}>A  Diamond  is  Forever</p>
           <p  className="ltext-101 cl2 respon2"
         style={{
          // transform: 'translate(-50%,-50%)',
          transition:'opacity 0.5s ease-in-out',
          fontSize:'20px', position: 'absolute', color:'black',margin:'370px  0px  0px 975px',textShadow: '2px 2px 4px #c39584'}}>Life isn't perfect but your jewellery can be.</p>
          <img src="images/slider/sld2.png" alt="Image 2" style={{ height: '100vh' }} />
        </div>
        <div className="images">
          <img src="images/slider/sld3.png" alt="Image 3" style={{ height: '100vh' }} />
        </div>
        <div className="images">
        <p className="ltext-101 cl2 respon2" style={{ fontSize:'25px', position: 'absolute', color:'black',margin:'270px  0px  0px 110px',textShadow: '2px 2px 4px #000000'}}>Every Women a Diomand</p>
          <h3 className="ltext-201 cl2 p-t-19 p-b-43 respon1" style={{position: 'absolute',margin:'280px  0px  0px 50px',fontSize:'40px',textShadow: '2px 2px 4px #c39584'}}>
                The rarer the pair.
              </h3>
          <img src="images/slider/sld1.png" alt="Image 3" style={{ height: '100vh' }} />
        </div> */}
        
        <div className="images">
          <img src="images/slider/antara1.jpg" alt="Image 3" style={{ height: '100vh' }} />
        </div>
        <div className="images">
          <img src="images/slider/tradi-2.jpg" alt="Image 3" style={{ height: '100vh' }} />
        </div>
        <div className="images">
          <img src="images/slider/antara2.jpg" alt="Image 3" style={{ height: '100vh' }} />
        </div>
        <div className="images">
          <img src="images/slider/antara3.jpg" alt="Image 3" style={{ height: '100vh' }} />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
