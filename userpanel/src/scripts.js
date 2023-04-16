import loadjs from "loadjs";
// import React from 'react'

const Script = () => {
  return (
   loadjs.reset(),
   loadjs("vendor/jquery/jquery-3.2.1.min.js",{async:true}),
   loadjs("vendor/animsition/js/animsition.min.js",{async:true}),
   loadjs("vendor/bootstrap/js/popper.js",{async:true}),
   loadjs("vendor/bootstrap/js/bootstrap.min.js",{async:true}),
   loadjs("vendor/select2/select2.min.js",{async:true}),
   loadjs("vendor/daterangepicker/moment.min.js",{async:true}),
   loadjs("vendor/daterangepicker/daterangepicker.js",{async:true}),
   loadjs("vendor/slick/slick.min.js",{async:true}),
   loadjs("vendor/parallax100/parallax100.js",{async:true}),
   loadjs("vendor/MagnificPopup/jquery.magnific-popup.min.js",{async:true}),
   loadjs("vendor/isotope/isotope.pkgd.min.js",{async:true}),
   loadjs("vendor/sweetalert/sweetalert.min.js",{async:true}),
   loadjs("vendor/perfect-scrollbar/perfect-scrollbar.min.js",{async:true}),
   loadjs("vendor/slick/slick.min.js",{async:true}),
   loadjs("js/slick-custom.js",{async:true}),
   loadjs("js/main.js",{async:true}),
   loadjs("Slider/js/jquery.min.js",{async:true}),
   loadjs("Slider/js/popper.js",{async:true}),
   loadjs("Slider/js/bootstrap.min.js",{async:true}),
   loadjs("Slider/js/owl.carousel.min.js",{async:true}),
   loadjs("Slider/js/main.js",{async:true}))
  
}

export default Script
