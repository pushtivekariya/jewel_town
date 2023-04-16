import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// import Quick_view from '../../quickView/quick_view'
//mansi hellooooo
import {getproducts} from "../../../api/common_api";

import { apiRoutes } from '../../../constant/api_url';
import { toast } from 'react-toastify';
import { BiRupee } from 'react-icons/bi';

function Prod() {
  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem('login_info'));
  // console.log(login,'loginnnnn');

  const[productData,setProductData] = useState();
 
  

  const getProductFunction = async () => {
    const response = await getproducts();
    console.log(response,"response");
    setProductData(response);
 
  }
  
useEffect(() => {
   getProductFunction();
  
},[])


  const addWishlist = (wishlist) => {
   if(login == null)
   {
    toast.error("Please login...")
   }
   else 
   {
    var wish = [];
    wish =  JSON.parse(localStorage.getItem('wish_list')) || [];
    if(wish.length > 0) {
      let count = wish.some(product => product.product_id === wishlist.product_id && product.email === login[0].email);
      if(!count) {
        wish.push({...wishlist,user_qty:1 , email:login[0].email})
        localStorage.setItem('wish_list' , JSON.stringify(wish));
        toast.success("product is added into wishlist");
        
      } else {
        toast.error("product is already into wishlist");
        navigate("/wishlist");
      }
    }
      else {
        wish.push({...wishlist,user_qty : 1, email:login[0].email})
        localStorage.setItem('wish_list',JSON.stringify(wish));
        toast.success("product is added into wishlist");
        
      }
   }

 
  }


  return (
    <>
   
<section className="bg0 p-t-23 p-b-140" style={{position:'relative'}}>
<div className="container">
  <div className="p-b-10">
    <h3 className="ltext-103 cl5">Product Overview</h3>
  </div>
  <div className="flex-w flex-sb-m p-b-52">
    <div className="flex-w flex-l-m filter-tope-group m-tb-10">
      <button
        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
        data-filter="*"
      >
        All Products
      </button>
      </div>
      </div>
      {/* <div className="row isotope-grid"> */}
      {/* Block2 */}

      {/* {
   console.log(productData,'@@@@@@@@@@@@@@@@@@@@@@') } */}
        <div className="row ">
      {
        productData?.map((product) => {
          // console.log(product,'111111111111111111');
            return(
              <>

      <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item men">

              <div className="block2">
        <div className="block2-pic hov-img0">
          <img src={`${apiRoutes.APIHOSTNAME}images/${product.image_url}`} alt="IMG-PRODUCT"/>
           <button
           onClick={()=>{
            navigate("/productview" ,{state:product})
           }}
                  
                  className="block2-btn flex-c-m stext-103 cl1 size-102 bg10 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                >
                  Quick View
                </button>
        </div>
        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l ">
            <Link
             to='/view'
              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
            >
              {product.short_description}
            </Link>
            <span className="stext-105 cl3">Rs. {product.price}</span>
            {/* <i className="zmdi zmdi-shopping-cart" /> */}
          </div>
          
          <div className="block2-txt-child2 flex-r p-t-3"   
          onClick={() => {
            addWishlist(product)
            window.location.reload();
          }} >

            <Link
              to='/'
              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
            
            >
              <img
                className="icon-heart1 dis-block trans-04"
                src="images/icons/icon-heart-01.png"
                alt="ICON"
              />
              <img
                className="icon-heart2 dis-block trans-04 ab-t-l"
                src="images/icons/icon-heart-02.png"
                alt="ICON"
              />
            </Link>
          </div>
      

        </div>
      </div>
    </div>
              </>
            )
          })
        }
        </div>
      
    {/* </div> */}
  {/* Load more */}
  <div className="flex-c-m flex-w w-full p-t-45">
    {/* <Link
      to='/'
      className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
    >
      Load More
    </Link> */}
  </div>
</div>
</section>
    </>
  )
}

export default Prod

           