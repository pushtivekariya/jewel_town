import React, { useState } from "react";
import './UserReview.css';
import { event } from "jquery";
import { toast } from "react-toastify";
import { userReview } from "../../api/common_api";
import Rating from "react-rating";

const UserReview = (props) => {
  const productid = props.productid
  console.log(productid, 'iddddd');
  const login = JSON.parse(localStorage.getItem("login_info"));
  const [ratings, setRating] = useState();
  const handleRatingChange = (value) => {
    setRating(value);
    setData({...data, rating: value});
    
  };
  console.log(ratings, "ratttt");
  let userid = null;

  
  if (login !== null && login.length > 0) {
    userid = login[0].user_id;
  }
  

  const [data, setData] = useState({
    review_title: "",
    review: "",
    user_name: "",
    email: "",
    user_id: userid,
    product_id: productid,
    rating: ratings
  });

  const mailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const userReviewFunction = async () => {
    if(data.rating == "")
    {
      toast.error("Please Enter Rating")
    }
    else if(data.review_title == "")
    {
      toast.error("Please Enter Review Title")
    }
    else if(data.review == "")
    {
      toast.error("Please Enter Your Review")
    }
    else if(data.user_name == "")
    {
      toast.error("Please Enter Username")
    }
    else if(data.email == "")
    {
      toast.error("Please Enter Email")
    }
    else if(mailValidation.test(data.email) == false)
    {
     toast.error("Please Enter Your Mail In Proper Format")
    }
    else{
      const result = await userReview(data);
      console.log(result, 'response');
      if (result.status == 1) {
        toast.success("Thanks For Posting Your Review")
        setRating(null);
        setData({
        review_title: "",
        review: "",
        user_name: "",
        email: ""})
      }
    }
  
  }

  // const user_id = event.target.user_id.value;


  const reviewOnChange = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  console.log(data, 'data');
  return (
    <>
      <section className="get_in_touch">
        <h4 className="title">WE APPRECIATE YOUR REVIEW!</h4>
        <div className="container">
        <div className="contact_form row">
          <div
            style={{ fontSize: "16px", marginBottom: "10px",marginLeft:'12rem'}}
          >
            <Rating
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={ratings}
              onChange={(ratings) => { handleRatingChange(ratings) }}
            />
            <span>{ratings} out of 5 stars</span>
          </div>
          <div className="form-field col-lg-12" >
            <input name="review_title" value={data.review_title} type="text" className="input_text" id="name" onChange={(e) => { reviewOnChange(e) }} />
            <lable className="label">Review Title</lable>
          </div>
          <div className="form-field col-lg-12">
            <input name="review" value={data.review} type="text" className="input_text" id="name" onChange={(e) => { reviewOnChange(e) }} />
            <lable className="label">Review</lable>
          </div>
          <div className="form-field col-lg-6">
            <input type="text" value={data.user_name} name="user_name" className="input_text" id="name" onChange={(e) => { reviewOnChange(e) }} />
            <lable className="label">User Name</lable>
          </div>
          <div className="form-field col-lg-6">
            <input type="email" value={data.email} name="email" className="input_text" id="name" onChange={(e) => { reviewOnChange(e) }} />
            <lable className="label">Email</lable>
          </div>
          <div className="form-field col-lg-6">
            <button onClick={() => { userReviewFunction() }} className="submit-btn" type="button">Post Review</button>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default UserReview;
