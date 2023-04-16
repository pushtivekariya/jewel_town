import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about/about";
import Bespoke from "./pages/bespoke/bespoke";
import Checkout from "./pages/checkOut/checkout";
import Contact from "./pages/contact/contact";
import Gold from "./pages/home/banner/gold";
import Silver from "./pages/home/banner/silver";
import Shoping_cart from "./pages/home/cart/shoping_cart";
import Home from "./pages/home/home";
import Shop from "./pages/home/product/shop";
import Wishlist from "./pages/home/wishlist/wishlist";
import Login from "./pages/login-registration/login/login";
import Registration from "./pages/login-registration/registration/registration";
import Product_view from "./pages/quickView/product_view";
import UserProfile from "./pages/userprofile/userProfile";
import UserProfileForm from "./pages/userprofile/updateProfileForm";
import View_order from "./pages/viewOrder/view_order";
import ForgotPassword from "./pages/login-registration/login/forgotPassword";
import Promocode from "./pages/userprofile/promocode";
import UserReview from "./pages/review/userReview";
import ReviewList from "./pages/review/reviewList";
import Profile from "./pages/user_account/profile";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/bespoke" element={<Bespoke />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cartview" element={<Shoping_cart />} />
        <Route path="/updateprofileform" element={<UserProfileForm />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route path="/productview" element={<Product_view />} />
        <Route path="/vieworder" element={<View_order />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/gold" element={<Gold />} />
        <Route path="/silver" element={<Silver />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/promocode" element={<Promocode />} />
        <Route path="/review" element={<UserReview />} />
        <Route path="/userview" element={<ReviewList />} />
        <Route path="/account" element={<Profile />} />
        
      

      </Routes>
    </>
  );
};

export default Routing;