
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRoutes } from "../../constant/api_url";
import { FaHeart, FaOpencart, FaUserPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Wishlist from "../../pages/home/wishlist/wishlist";

import Checkout from "../../pages/checkOut/checkout";
import { getallproducts, getfilter } from "../../api/common_api";
import { toast } from "react-toastify";


const Header = () => {

  const navigate = useNavigate();
  const [cartStep, setCartStep] = useState(0);
  const [handleStep, setHandleStep] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);
  const cart_lists = JSON.parse(localStorage.getItem("cart_list"));
  const [cartData, setCartData] = useState(cart_lists);
  const wish = JSON.parse(localStorage.getItem("wish_list"));
  const [wishlistData, setWishlistData] = useState(wish)

  const totalamt = () => {
    let price = 0;
    cartData?.forEach((element) => {
      // console.log(element, 'eeeeeeeeeeeeeeeeeeeee');
      price += element.price * element.user_qty;
      // price += 100 * 100;
    });
    setCartPrice(price);
    // console.log(price, 'ppppppppppppppp');
  };
  useEffect(() => {
    totalamt();
  }, [cartData]);

  const login = JSON.parse(localStorage.getItem("login_info"));

  const log_out = () => {
    localStorage.removeItem("login_info");
    if (login.length > 0) {
      navigate("/login");
      toast.error("You are LogOut")
      window.location.reload();
    }
    // setTimeout(() => {
    // window.location.reload();
      
    // }, 3000);
  };

  useEffect(() => {

    if (login !== null) {
      const cart_lists = JSON.parse(localStorage.getItem("cart_list"));
      setCartData(cart_lists);

      const wish = JSON.parse(localStorage.getItem("wish_list"));
      setWishlistData(wish);

    }
    else {
      setCartData([]);
      setWishlistData([]);
    }
  }, [])
  useEffect(() => {
    if (login !== null) {
      const data = cart_lists?.filter((data) =>
        data.email == login[0]?.email)
        .map((datas) => {
          return datas;
        })
      console.log(data, "data");
      setCartData(data);
    }

  }, []);


  useEffect(() => {
    if (login !== null) {
      const data = wish?.filter((data) =>
        data.email == login[0]?.email)
        .map((datas) => {
          return datas;
        })
      console.log(data, "data");
      setWishlistData(data);
    }

  }, []);

  return (
    <div>
      <header>
        {/* Header desktop */}
        <div className="container-menu-desktop">
          <div className="wrap-menu-desktop">
            <nav className="limiter-menu-desktop container">
              {/* Logo desktop */}
              <Link to="/" className="logo">
                <img src="images/icons/logoUser.png" alt="IMG-LOGO" />
              </Link>
              {/* Menu desktop */}
              <div className="menu-desktop">
                <ul className="main-menu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to='/shop'>Shop</Link>

                  </li>

                  <li>
                    <Link to="/bespoke">Bespoke</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              {/* Icon header */}
              <div
                className="wrap-icon-header flex-w flex-r-m"
                style={{ marginLeft: "-20px" }}
              >
                {/* <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                  <FiSearch />
                </div> */}
                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                  data-notify={login == null ? 0 : cartData?.length}
                  onClick={() => {
                    setCartStep(1);
                  }}
                >
                  <FaOpencart />
                </div>
                <Link
                  to="/wishlist"
                  className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                  data-notify={login == null ? 0 : wishlistData?.length}
                  onClick={() => {
                    Wishlist();
                  }}
                >
                  <FaHeart />
                </Link>

                <div style={{ fontFamily: "Nunito Sans,sans-serif!important" }}>
                  <ul className="main-menu">
                    <li>
                      <Link
                        style={{ fontSize: "27px" }}
                        to=""
                        className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-user"
                      >
                        <FaUserPlus />
                      </Link>

                      {
                        login != null ? (
                          <ul className="sub-menu">
                            <li style={{ margin: "10px" }}>
                              <p style={{ fontSize: "18px", fontWeight: "900px" }}>
                                HI! {login[0].user_name}
                              </p>
                            </li>
                            <li
                              style={{
                                margin: "10px",
                                borderBottom: "2px solid black",
                              }}
                            >
                              <p style={{ fontSize: "15px", marginBottom: "10px" }}>
                                {login[0].contact_no}
                              </p>
                            </li>
                            <li style={{ margin: "5px" }}>
                              <Link
                                to="/account"
                                style={{ fontSize: "15px", marginLeft: "-15px" }}
                              >
                                My Account
                              </Link>
                            </li>
                            <li style={{ margin: "5px" }}>
                              <Link
                                to="/login"
                                // className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-user"
                                onClick={() => {
                                  log_out();
                                }}
                                style={{
                                  fontSize: "15px",
                                  marginLeft: "-15px",
                                  marginTop: "-18px",
                                }}
                              >
                                Log Out
                              </Link>
                            </li>
                          </ul>
                        ) :
                          (
                            <ul className="sub-menu">
                              <li style={{ margin: "10px" }}>
                                <h4 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: '300px' }}>My Account</h4>
                              </li>
                              <li style={{ margin: "10px" }}>
                                <button
                                  onClick={() => {
                                    navigate('/login')
                                  }}
                                  style={{ backgroundColor: '#c39587', color: 'white', border: '0.01em solid black', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', verticalAlign: 'middle', padding: '0.2em 1em' }}>Log-In</button>
                              </li>
                            </ul>
                          )
                      }


                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Header Mobile */}
        <div className="wrap-header-mobile">
          {/* Logo moblie */}
          <div className="logo-mobile">
            {/* Logo desktop */}
            <Link to="/" className="logo">
              <img
                src="images/icons/logoUser.png"
                alt="IMG-LOGO"
                style={{ height: "auto", width: "auto" }}
              />
            </Link>
          </div>
          {/* Icon header */}
          <div className="wrap-icon-header flex-w flex-r-m m-r-15">
            {/* <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
              <i className="zmdi zmdi-search" />
            </div> */}
            <div
              className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
              data-notify={login == null ? 0 : cartData?.length}
              onClick={() => {
                setCartStep(1);
              }}
            >
              {/* <span class="badge badge-secondary">{cart_list?.length}</span> */}
              <i className="zmdi zmdi-shopping-cart" />
            </div>
            <Link
              to="/wishlist"
              className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
              data-notify={login == null ? 0 : wishlistData?.length}
              onClick={() => {
                Wishlist();
              }}
            >
              <i className="zmdi zmdi-favorite-outline" />
            </Link>
            <div style={{ fontFamily: "Nunito Sans,sans-serif!important" }}>
                  <ul className="main-menu" >
                    <li>
                      <Link
                        style={{ fontSize:"27px" }}
                        to=""
                        className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-user"
                      >
                        <FaUserPlus />
                      </Link>

                      {
                        login != null ? (
                          <ul className="sub-menu">
                            <li style={{ margin: "10px" }}>
                              <p style={{ fontSize: "18px", fontWeight: "900px" }}>
                                HI! {login[0].user_name}
                              </p>
                            </li>
                            <li
                              style={{
                                margin: "10px",
                                borderBottom: "2px solid black",
                              }}
                            >
                              <p style={{ fontSize: "15px", marginBottom: "10px" }}>
                                {login[0].contact_no}
                              </p>
                            </li>
                            <li style={{ margin: "5px" }}>
                              <Link
                                to="/account"
                                style={{ fontSize: "15px", marginLeft: "-15px" }}
                              >
                                My Account
                              </Link>
                            </li>
                            <li style={{ margin: "5px" }}>
                              <Link
                                to="/login"
                                // className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-user"
                                onClick={() => {
                                  log_out();
                                }}
                                style={{
                                  fontSize: "15px",
                                  marginLeft: "-15px",
                                  marginTop: "-18px",
                                }}
                              >
                                Log Out
                              </Link>
                            </li>
                          </ul>
                        ) :
                          (
                            <ul className="sub-menu">
                              <li style={{ margin: "10px" }}>
                                <h4 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: '300px' }}>My Account</h4>
                              </li>
                              <li style={{ margin: "10px" }}>
                                <button
                                  onClick={() => {
                                    navigate('/login')
                                  }}
                                  style={{ backgroundColor: '#c39587', color: 'white', border: '0.01em solid black', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', verticalAlign: 'middle', padding: '0.2em 1em' }}>Log-In</button>
                              </li>
                            </ul>
                          )
                      }


                    </li>
                  </ul>
                </div>
          </div>
          {/* Button show menu */}

          <div className="btn-show-menu-mobile hamburger hamburger--squeeze"
            onClick={() => {
              if (handleStep == 1) {
                setHandleStep(0);
              }
              else {
                setHandleStep(1);

              }

            }}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </div>
        </div>
        {/* Menu Mobile */}
        {
          handleStep == 1 && (
            <div class="menu-mobile">
              <ul class="main-menu-m">
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/bespoke">Bespoke</Link>
                </li>

                <li>
                  <Link to="/about">About</Link>
                </li>

                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          )
        }


        {/* Modal Search */}
        {/* <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <img src="images/icons/icon-close2.png" alt="CLOSE" />
            </button>
            <form className="wrap-search-header flex-w p-l-15">
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search" />
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
              onBlur={(e) => {
                setFilterData({
                  ...filterData,
                  product_name_id: e.target.value,
                });
                handleFilter(
                  filterData?.jwellery_type,
                  filterData?.gender,
                  filterData?.price,
                  filterData?.product_name_id,
                  e.target.value
                );
                // handleFilter(filterData?.price, filterData?.size, filterData?.colors,e.target.value)
              }}
              />
            </form>
          </div>
        </div> */}
      </header>
      {/* Cart */}

      {cartStep == 1 && (

        <div className="wrap-header-cart js-panel-cart show-header show-header-cart">
          <div className="s-full js-hide-cart" />
          <div className="header-cart flex-col-l p-l-65 p-r-25">
            <div className="header-cart-title flex-w flex-sb-m p-b-8">
              <span className="mtext-103 cl2">Your Cart</span>
              <div
                className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart"
                onClick={() => {
                  setCartStep(0);
                }}
              >
                <i className="zmdi zmdi-close" />
              </div>
            </div>

            {
              cartData == "" ? (
                <>                        
                  <img src="emptyCart/images.jpg" alt="no image" style={{ height: '100px', width: '100px', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px' }}></img>
                  <h6 style={{ textAlign: 'center', textTransform: 'uppercase', color: '#c39584', fontWeight: 600, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Your Cart Is Empty</h6>
                  <p style={{ textAlign: 'center', fontSize: '12px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>There is nothing in your bag. Let's add some items. </p>
                  <button
                    style={{ width: '70%', height: '40px', marginTop: '10px', alignItems: 'center', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                    type="button"
                    className="add-cart-btn"
                    onClick={() => {

                      navigate('/')
                      setCartStep(0);
                    }}
                  >
                    Continue shopping
                  </button>
                  </>

           
              ) : (
                <div className="header-cart-content flex-w js-pscroll">
                  <ul className="header-cart-wrapitem w-full">
                    {cartData?.map((cartdata, index) => {
                      console.log(cartdata, "cartdataaaa");
                      let total =
                        parseInt(cartData?.user_qty) * parseInt(cartData?.price);

                      return (
                        <li className="header-cart-item flex-w flex-t m-b-12">
                          <div className="header-cart-item-img">
                            <img
                              src={`${apiRoutes.APIHOSTNAME}images/${cartdata.image_url}`}
                              alt="IMG"
                            />
                          </div>
                          <div className="header-cart-item-txt p-t-8">
                            <a
                              href="#"
                              className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                            >
                              {cartdata.product_names} ({cartdata.jewellary_purity})
                            </a>

                            <span className="header-cart-item-info">
                             Rs. {cartdata.price}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="w-full">
                    <div className="header-cart-total w-full p-tb-40">
                      Total: {cartPrice}
                    </div>
                    <div className="header-cart-buttons flex-w w-full">
                      <Link
                        to="/cartview"
                        className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
                        onClick={() => {
                          setCartStep(0);
                        }}
                      >
                        View Cart
                      </Link>
                      <Link
                        to="/checkout"
                        className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
                        onClick={() => {
                          Checkout();
                        }}
                      >
                        Check Out
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }

          </div>
        </div>

      )}
    </div>
  );
};

export default Header;

