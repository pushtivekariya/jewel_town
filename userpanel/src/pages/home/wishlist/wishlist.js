import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { AiOutlinePlus } from 'react-icons/ai';
import { apiRoutes } from '../../../constant/api_url';
import './wishlist.css'
import Header from '../../../component/header/header';
import Footer from '../../../component/footer/footer';
import { useEffect } from 'react';
import { MdCancel } from 'react-icons/md'


function Wishlist() {
  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem("login_info"));
  const wish = JSON.parse(localStorage.getItem('wish_list'));
  const [wishlistData, setWishlistData] = useState(wish);
   


  useEffect(() => {
    if(login !== null){
      const wish = JSON.parse(localStorage.getItem("wish_list"));
      setWishlistData(wish);
    }  
    else{
      setWishlistData([]);
    }
    console.log("wish data updated:", wishlistData);
  },[])
 
  
  function handleRemoveWishlist(itemId) {
    const updatedwish = wishlistData.filter((wishlistData) => wishlistData.product_id !== itemId
    );
    setWishlistData(updatedwish);
    localStorage.setItem("wish_list", JSON.stringify(updatedwish));
    window.location.reload();
  }

  useEffect(() => {
    if(login !== null){
      const data = wish?.filter((data) => 
      data.email == login[0]?.email)
      .map((datas) => {
        return datas;
      })
        console.log(data,"data");
        setWishlistData(data);
    }
  
  },[]);



  return (
    <>
   {/* <Header/> */}
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: 'url("images/slider1.jpg")' }}
      >
        <h2 className="ltext-105 cl0 txt-center">WishList</h2>
      </section>
      <div class="portfolio gallery row">
        {wishlistData?.map((wishlist) => {
          console.log(wishlist, "www");
          return (
            <>

              <div className="item ">
                <div className="thumb">
                  <a href="#" className="category">{wishlist.product_names}</a>
                  <a href={`${apiRoutes.APIHOSTNAME}images/${wishlist.image_url}`} className="galleryimage">

                    <AiOutlinePlus />
                  </a>

                  <img src={`${apiRoutes.APIHOSTNAME}images/${wishlist.image_url}`} alt="IMG-PRODUCT" />

                  {/* <img src="https://source.layoutflow.com/images/pic1.jpg" alt="" /> */}
                </div>
                <div className="text">
                  <h3>{wishlist.short_description}</h3>
                  <p>Rs. {wishlist.price}</p>

                  <button
                    onClick={() => {
                      navigate("/productview", { state: wishlist })
                    }}

                    className="view"
                  >
                    Quick View
                  </button>
                   <Link 
                   style={{
                    fontSize:'15px',
                    textDecoration:'underline'
                   }}
                   onClick={()=> {
                    handleRemoveWishlist(wishlist.product_id)
                   }}
                   >Remove</Link> 
                  
                </div>
              </div>
            </>
          )
        })}
      </div>



      {
        wishlistData == '' ? (
          <>
          <div class="portfolio gallery">
            <img src='emptyCart/nullWishlist.png' alt='no image' style={{height:'150px',width:'180px',display:'block',marginLeft:'auto',marginRight:'auto',textAlign:'center',marginTop:'-60px'}}></img>
            <h5 style={{ textAlign: 'center', margin: '10px', textTransform: 'uppercase', color: '#c39584', fontWeight: 600 }}>No Items In The Wishlist</h5>
            <button
                    style={{width:'20%',height:'50px',marginTop:'20px',alignItems:'center', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
                      type="button"
                      className="add-cart-btn"
                      onClick={() => {

                        navigate('/')
                      }}
                    >
                      Continue shopping
                    </button>
            </div>
            </>
        ) : (
            <p></p>
        )
      }
{/* <Footer/> */}
    </>
  )
}

export default Wishlist