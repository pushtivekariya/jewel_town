import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getproductimages, getproducts, getsize } from "../../api/common_api";
import { apiRoutes } from "../../constant/api_url";
import Rating from "react-rating";
import "./product_view.css";
import "../review/UserReview.css"
import { toast } from "react-toastify";
import Select from "react-select";
import { FaPen } from 'react-icons/fa';
import {BiShow} from 'react-icons/bi';
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import UserReview from "../review/userReview";
import ReviewList from "../review/reviewList";


function Product_view() {
  const allHoverImages = document.querySelectorAll(".hover-container div img");
  const imgContainer = document.querySelector(".img-container");

  window.addEventListener("DOMContentLoaded", () => {
    allHoverImages[0].parentElement.classList.add("active");
  });

  allHoverImages.forEach((image) => {
    image.addEventListener("mouseover", () => {
      imgContainer.querySelector("img").src = image.src;
      resetActiveImg();
      image.parentElement.classList.add("active");
    });
  });

  function resetActiveImg() {
    allHoverImages.forEach((img) => {
      img.parentElement.classList.remove("active");
    });
  }

  const [viewdata, setViewData] = useState();
  const [productData, setProductData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [imagedata, setImageData] = useState();
  const [reviewstep,setReviewStep] = useState(0);
  const [liststep,setListStep] = useState(0);
  const [size, setSize] = useState([]);
  console.log(size, "sizee");
  const navigate = useNavigate();
  const cart_lists = JSON.parse(localStorage.getItem("cart_list"));

  const [cartData, setCartData] = useState(cart_lists);

  const login = JSON.parse(localStorage.getItem("login_info"));

 
  const getProductFunction = async () => {
    const response = await getproducts();
    console.log(response, "response");
    setProductData(response);
  };


  const getSizeFunction = async (product_name_id) => {
    const response = await getsize(product_name_id);
    console.log(response.result, "rrrrrrrrrrrrr");
    const sizearr = [];
    response?.result.map((sizes) => {
      console.log(sizes, "ssssssssssssss");
      if (state.product_name_id == sizes.product_name_id) {
        sizearr.push({
          value: sizes.product_name_id,
          label: sizes.size,
        });
        setSize(sizearr);
      }
      console.log(sizearr, "sizearrrrrr");
    });
  };

  // console.log(size,"sizestate");
  // const sizeOption=[]
  // size?.map((s)=>{
  //     sizeOption.push({value:s.value,label:s.label})
  // })
  // console.log(sizeOption,"sizeoption");

  useEffect(() => {
    getProductFunction();
  }, []);

  const { state } = useLocation();
  console.log(state, "stateeee");
  useEffect(() => {
    if (state !== null) {
      setViewData({ ...state, user_qty: quantity });
    }
  }, [state]);

  const getViewProductFunction = async () => {
    const response = await getproductimages();
    console.log(response.result, "ressssssssss");
    setImageData(response.result);
  };

  useEffect(() => {
    getViewProductFunction();
    getSizeFunction();
  }, []);

  console.log(size, "sizeeeeeeee");

  // const addToCart = () => {
  //   if (login == null) {
  //     toast.error("please login....");
  //   }
  //      else if ((viewdata.product_names == "Bangles" || viewdata.product_names == "Rings" || viewdata.product_names == "Kada") && viewdata.size == null) {
  //       toast.error("please select size");
  //   }
  //    else {
  //     var add = [];
  //     add = JSON.parse(localStorage.getItem("cart_list")) || [];
  //     if (add.length > 0) {
  //       let count = add.some(
  //         (product) => product?.product_id === viewdata?.product_id && product.user_id === login[0].email
  //       );
  //       console.log(count, "222222222");
  //       if (!count) {
  //         console.log(viewdata, "@@@@@#####");
  //         add.push({
  //           ...viewdata,
  //           user_qty: quantity,
  //           total_amt: viewdata.price,
  //           email: login[0].email,
  //         });
  //         localStorage.setItem("cart_list", JSON.stringify(add));
  //         window.location.reload();
  //         toast.success("product is added in your cart...");
  //       } else {
  //         toast.error('product is already exist in your cart...')
  //         navigate("/cartview");
  //       }
  //     } else {
  //       console.log(viewdata, "@@@@@");
  //       add.push({
  //         ...viewdata,
  //         user_qty: quantity,
  //         total_amt: viewdata.price,
  //         email: login[0].email,
  //       });
  //       localStorage.setItem("cart_list", JSON.stringify(add));
  //       window.localStorage.reload();
  //     }
  //   }
  //   console.log(JSON.parse(localStorage.getItem("cart_list")), "product");
  // };
  const addToCart = () => {
    if (login == null) {
      toast.error("Please login....");
    } else if (
      (viewdata.product_names === "Bangles" ||
        viewdata.product_names === "Rings" ||
        viewdata.product_names === "Kada") &&
        viewdata.size == null
    ) {
      toast.error("Please select a size.");
      
    } else {
      var add = [];
      add = JSON.parse(localStorage.getItem("cart_list")) || [];
      if (add.length > 0) {
        let productIndex = add.findIndex(
          (product) => product?.product_id === viewdata?.product_id && product.email === login[0].email
        );
        if (productIndex === -1) {
          add.push({
            ...viewdata,
            user_qty: quantity,
            total_amt: viewdata.price,
            email: login[0].email,
          });
          localStorage.setItem("cart_list", JSON.stringify(add));
          toast.success("product is added to your cart")
          window.location.reload();
    
        } else {
          toast.error("This product is already in your cart.");
          setTimeout(() => {
            navigate("/cartview");
          }, 2000);
          
        }
      } else {
        add.push({
          ...viewdata,
          user_qty: quantity,
          total_amt: viewdata.price,
          email: login[0].email,
        });
        localStorage.setItem("cart_list", JSON.stringify(add));
        setTimeout(() => {
        toast.success("product is added to your cart")
          
        }, 4000);
        window.location.reload();
       
      }
    }
    console.log(JSON.parse(localStorage.getItem("cart_list")), "product");
  };
  
  const arrview = [];
  const view = arrview.push(viewdata);

  console.log(viewdata, "quantityy");
  // console.log(arrview, "vieeee");

  const productid = viewdata?.product_id
//  console.log(productid,'productid');

  return (
    <>
    {/* <Header/> */}
      <div className="main-wrapper">
        <div className="container">
          {arrview.map((view) => {
            console.log(view, "vvvvvvvvvvvvvvvvv");
            return (
              <>
                <div className="product-div">
                  <div className="product-div-left">
                    <div className="img-container">
                      <img
                        src={`${apiRoutes.APIHOSTNAME}images/${view?.image_url}`}
                        alt="watch"
                      />
                    </div>
                    <div className="hover-container">
                      {imagedata?.map((images) => {
                        if (viewdata.product_id == images.product_id) {
                          return (
                            <div>
                              <img
                                src={`${apiRoutes.APIHOSTNAME}images/${images?.image_url}`}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="product-div-right">
                    <span className="product-name">
                      {state.short_description} ({state.jewellary_purity})
                    </span>
                  
                    <span className="product-price" style={{color:'#c39584' , fontWeight:'bold',fontSize:'25px'}}>Rs.{state.price}</span>
                    <span className="product-price">{state.weight}</span>

                    <div className="wrap-num-product flex-w m-l-auto m-r-0">
                      <div
                        className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                        onClick={() => {
                          if (quantity > 1) {
                            setQuantity(quantity - 1);
                          } else {
                            toast.error("your product quantity is invalid");
                                      
                          }
                        }}
  
                      >
                        <i className="fs-16 zmdi zmdi-minus" />
                      </div>
                      <input
                        className="mtext-104 cl3 txt-center num-product"
                        type="number"
                        name="num-product1"
                        value={quantity}
                      />
                      <div
                        className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                        onClick={() => {
                          if (quantity < state.quantity)
                          {
                          setQuantity(quantity + 1);
                          }
                          else {
                            toast.error(`This Product is only ${state.quantity} Left`);

                          }
                       
                       
                        }
                      
                      }
                      >
                        <i className="fs-16 zmdi zmdi-plus" />
                      </div>
                    </div>

                    {state.product_names == "Bangles" || state.product_names == "Rings" || state.product_names == "Kada" ? (
                      <div className="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
                        <Select
                        placeholder="Select Size....."
                          onChange={(e) => {
                            if (state.product_names == "Bangles" || state.product_names == "Rings" || state.product_names == "Kada") {
                              setViewData({
                                ...viewdata,
                                size: e.label,
                              });
                            }
                          }}
                          options={size}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}

                    <p className="product-description">{state.description}</p>
                    <div className="btn-groups">
                      {/* <Link to='/cartview'> */}
                      {
                        state.quantity == 0 ? (                      
                          <button
                          disabled
                          type="button"
                          className="add-cart-btn"
                          onClick={() => {
                            addToCart();
                            toast.error("This Product is Out of Stock")
                            // toast.success("product is added to your cart")
                            // navigate('/cartview')
                          }}
                        >
                          <i
                            className="zmdi zmdi-shopping-cart"
                            style={{ fontSize: "20px" }}
                          />
                          add to cart
                        </button>
                        ):
                        (
                          <button
                          type="button"
                          className="add-cart-btn"
                          onClick={() => {
                            addToCart();
                            // window.location.reload();
                            // navigate('/cartview')
                          }}
                        >
                          <i
                            className="zmdi zmdi-shopping-cart"
                            style={{ fontSize: "20px" }}
                          />
                          add to cart
                        </button>
                        )
                      }
                      <button
                        type="button"
                        className="buy-now-btn"
                        onClick={() => {
                          addToCart();
                          window.location.href = "/cartview";
                          // window.location.reload();
                        }}
                      >
                        <i className="fas fa-wallet" />
                        buy now
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>


      <div className="col-12 p-md-0 p-2 m-2 m-md-0 mt-0 mt-md-3">
        <h4 className="reviewname">Review</h4>
      </div>


      
      <div className="writereview">
      
        <button className="reviewbutton"
        onClick={()=> {
          if(reviewstep == 1)
          {
            setReviewStep(0);
          }
          else{
            setReviewStep(1);
            setListStep(0);
          }
          
        }}
        >
          <span className="penicon"><FaPen/></span>
          <span className="revspan">Write A Review</span>
        </button>
     
        <button className="reviewbutton"
        onClick={()=>{
          if(liststep == 1)
          {
            setListStep(0);
          }
          else{
            setListStep(1);
            setReviewStep(0);
          }
        }}
        >
        <span className="penicon"><BiShow/></span>
          <span className="revspan">Show Review</span>
        </button>
      </div>
      {reviewstep == 1 && (
         <div className="main-wrapper" style={{marginTop:'-4rem'}}>
         <div className="container">

          <UserReview productid={productid}/>

         </div>
         </div>
      )

      }
      {
        liststep == 1 && (
          <div className="main-wrapper" style={{marginTop:'-9rem'}}>
          <div className="container">
          <ReviewList productid={productid}/>
          </div>
          </div>
        )
      }

    </>
  );
}

export default Product_view;
