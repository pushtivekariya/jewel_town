import React from "react";
import { FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { BsTelephone } from "react-icons/bs";
import "./contact.css";

import { contact } from "../../api/common_api";
import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

function ContextUs() {
  const [contactData, setContactData] = useState({
    name :"",
    email :"",
    comment:""
  });

  const changeData =async (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };
  const mailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const submitContactdata = async () => {
    if (contactData.name == "") {
      toast.error("Please Enter Your Name")
    } else if(contactData.email == ""){
      toast.error("Please Enter Email Address")
    }else if(mailValidation.test(contactData.email) == false){
     toast.error("Please Enter Your Mail In Proper Format")
    }else if (contactData.comment == ""){
      toast.error("Plase Enter Comment")
    }else{

      const result = await contact(contactData);
      console.log(result);
      if (result.status == 1) {
        toast.success("We are Connect To You In Shortly")
        setContactData({
          name :"",
          email :"",
          comment:""})
      }
    }
  };
  return (
    <>
   {/* <Header/>   */}
      <section
    className="bg-img1 txt-center p-lr-15 p-tb-92"
    style={{ backgroundImage: 'url("images/contact_us.jpg")' , height:'14rem' }}
  >

  </section>
      <section className="contact">
        <div className="contactHeading">
          <h2>Contact Us</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="contactWidget">
                <div className="contactWidgetItem">
                  <div className="icon">
                    
                    <GrLocation className="diffIcon" />
                  </div>
                  <div className="text">
                    <h5>Address</h5>
                    <p>455 Avadh Utopia, Vesu, Surat, Gujarat, India</p>
                  </div>
                </div>

                <div className="contactWidgetItem">
                  <div className="icon">
                    {/* <i className='fa-solid fa-phone'></i> */}
                    <BsTelephone className="diffIcon" />
                  </div>
                  <div className="text">
                    <h5>Contact Us</h5>
                    <p>125-711-811 | 125-668-886</p>
                  </div>
                </div>

                <div className="contactWidgetItem">
                  <div className="icon">
                    {/* <i className='fa-regular fa-envelope'></i> */}
                    <FiMail className="diffIcon" />
                  </div>
                  <div className="text">
                    <h5>Mail</h5>
                    <p>jwel.town@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="contactForm">
                <form>
                  <input
                    type="text"
                    placeholder="Name"
                    value={contactData.name}
                    name="name"
                    onChange={(e) => {
                      changeData(e);
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contactData.email}
                    name="email"
                    onChange={(e) => {
                      changeData(e);
                    }}
                  />
                  <textarea
                  maxLength="255"
                    placeholder="Comment"
                    className="textarea"
                    value={contactData.comment}
                    name="comment"
                    onChange={(e) => {
                      changeData(e);
                    }}
                  ></textarea>
                  <button
                  type="button"
                    className="siteBtn"
                    onClick={() => {
                      submitContactdata();
                    }}
                  >
                    send me
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="mapColumn">
              <div className="contactMap">
                <iframe
                  title="main"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29770.67500920542!2d72.75249121797339!3d21.139087350061796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be05276ea0507ad%3A0x73c16cff225b784!2z4KS14KWH4KS44KWBLCDgpLjgpYLgpLDgpKQsIOCkl-ClgeCknOCksOCkvuCkpA!5e0!3m2!1shi!2sin!4v1674711618310!5m2!1shi!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* <Footer/>             */}
    </>
  );
}
export default ContextUs;
