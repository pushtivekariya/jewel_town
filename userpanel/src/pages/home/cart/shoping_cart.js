import { ResetTvOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRoutes } from "../../../constant/api_url";
import { MdDelete } from "react-icons/md";
import Checkout from "../../checkOut/checkout";
import Select from "react-select";
import { checkPromocode, getPromocode } from "../../../api/common_api";
import { toast } from "react-toastify";
import Footer from "../../../component/footer/footer";
import Header from "../../../component/header/header";
import { useRef } from "react";


function Shoping_cart() {
  const navigate = useNavigate()
  const cart_lists = JSON.parse(localStorage.getItem("cart_list"));
  const login = JSON.parse(localStorage.getItem("login_info"));
  const promoCodeInputRef = useRef(null);
  const [cartData, setCartData] = useState(cart_lists);
  const [cartPrice, setCartPrice] = useState(0);
  const [promoCode, setPromoCode] = useState(null);
  const [promocodelist, setPromocodeList] = useState();
  let promocodeUse = null;

  const DiscountData = JSON.parse(localStorage.getItem("promocode_resp"));

  const handleQuantity = (qty, index) => {
    cartData[index] = {
      ...cartData[index],
      user_qty: qty,
      total_amt: parseInt(qty) * parseInt(cartData[index].price),
    };

    setCartData([...cartData]);
    localStorage.setItem("cart_list", JSON.stringify(cartData));
  };

  const totalamt = () => {
    let price = 0;
    cartData.forEach((element) => {
      console.log(element, "eeeeeeeeeeeeeeeeeeeee");
      price += element.price * element.user_qty;
      // price += 100 * 100;
    });
    setCartPrice(price);
    // console.log(price,'ppppppppppppppp');
  };


  useEffect(() => {
    totalamt();
  }, [cartData]);


  

  // function handleRemoveItem(itemId) {
  //   const updatedCart = cartData.filter(
  //     (cartData) => cartData.product_id !== itemId
  //   );
  //   setCartData(updatedCart);
  //   localStorage.setItem("cart_list", JSON.stringify(updatedCart));
  //   window.location.reload();
  // }
  function handleRemoveItem(itemId) {
   const updatedCart = cartData.filter(cartData => cartData.product_id !== itemId);
   setCartData(updatedCart);
   const storedCart = JSON.parse(localStorage.getItem('cart_list'));
   const filterCart = storedCart.filter(cartData => cartData.email !== login[0].email || cartData.product_id !== itemId);
   localStorage.setItem("cart_list", JSON.stringify(filterCart));
   window.location.reload();

  }

  useEffect(() => {
    if (login !== null) {
      const cart_lists = JSON.parse(localStorage.getItem("cart_list"));
      setCartData(cart_lists);
    }
    else {
      setCartData([]);
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
  

  const checkLogin = () => {
    if (login == null) {
      toast.error("Please Login")
    }
    else {

      window.location.replace("/checkout")
    }
  }


  

 


  const promocodeListFunction = async () => {
    let response = await getPromocode();
    console.log(response.result, 'responsedata');
    setPromocodeList(response.result);
  }

  promocodelist?.forEach((promocode) => {
    console.log(promocode,'promocode');
    promocodeUse = promocode;
  })


  const checkPromocodeFunc = async (value) => {
    let obj = {
      promocode: value,
      user_id: login[0].user_id,
      cartData: cartData,
    };
    console.log(obj.promocode, "value");
    let checkPromocodeResponse = await checkPromocode(obj);
    if (checkPromocodeResponse.status == 1) {
      setPromoCode(checkPromocodeResponse.data);
      checkPromocodeResponse.data["promocode_name"] = obj.promocode;
      localStorage.setItem(
        "promocode_resp",
        JSON.stringify(checkPromocodeResponse.data, obj.promocode) 
      );
      toast.success("Promocode apply successfully");
    }
    else if(cartPrice < promocodeUse?.minimum_order_amount)
    {
        toast.error("Your order is less than minimum order amount");
    }
    else {
      console.log(checkPromocodeResponse.data, "checkpromocoderesponse");

    }
    if (checkPromocodeResponse.status == 2)
    {
      toast.error("This promocode is already used");

    } 
  };
 




  useEffect(() => {
    promocodeListFunction();
  }, [])

  console.log(promocodelist, "promocodelist");
  return (
    <>
      {/* <Header/> */}
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "-40px" }}
      >
        {/* <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </Link>
          <span className="stext-109 cl4">Shoping Cart</span>
        </div> */}

      </div>
      {/* Shoping Cart */}
      {
        cartData == "" ? (
          <form className="bg0 p-t-75 p-b-85">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                  <div className="m-l-25 m-r--38 m-lr-0-xl">
                    {/* <div className="wrap-table-shopping-cart"> */}
                    <img src="emptyCart/images.jpg" alt="no image" style={{ height: '150px', width: '150px', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px' }}></img>
                    <h5 style={{ textAlign: 'center', margin: '10px', textTransform: 'uppercase', color: '#c39584', fontWeight: 600 }}>Your Cart Is Empty</h5>
                    <p style={{ textAlign: 'center', fontSize: '15px' }}>There is nothing in your bag. Let's add some items. </p>
                    <button
                      style={{ width: '40%', height: '50px', marginTop: '20px', alignItems: 'center', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                      type="button"
                      className="add-cart-btn"
                      onClick={() => {

                        navigate('/')
                      }}
                    >
                      Continue shopping
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <form className="bg0 p-t-75 p-b-85">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                  <div className="m-l-25 m-r--38 m-lr-0-xl">
                    <div className="wrap-table-shopping-cart">
                      <table className="table-shopping-cart">
                        <tbody>
                          <tr className="table_head">
                            <th className="column-1">Product</th>
                            <th className="column-2">jewellery</th>
                            <th className="column-3">size</th>
                            <th className="column-4">Price</th>
                            <th className="column-5">Quantity</th>
                            <th className="column-6">Total</th>
                            <th className="column-7">Delete</th>
                          </tr>
                          {cartData &&
                            cartData?.map((cartData, index) => {
                              let total =
                                parseInt(cartData?.user_qty) *
                                parseInt(cartData?.price);


                              return (
                                <tr className="table_row">
                                  <td className="column-1">
                                    <div className="how-itemcart1">
                                      <img
                                        src={`${apiRoutes.APIHOSTNAME}images/${cartData.image_url}`}
                                        alt="IMG"
                                        onClick={() => {
                                          navigate("/productview", { state: cartData })
                                        }}
                                      />
                                    </div>
                                  </td>
                                  <td className="column-2">
                                    {cartData.product_names}
                                  </td>
                                  {
                                    cartData.size == null ? (
                                      <td className="column-3">-</td>
                                    ) : (
                                      <td className="column-3">{cartData.size}</td>
                                    )
                                  }
                                  <td
                                    className="column-4"
                                    style={{ fontSize: "15px" }}
                                  >
                                   Rs.{cartData.price}
                                  </td>
                                  <td className="column-5">
                                    <div className="wrap-num-product flex-w m-l-auto m-r-0">
                                      <div
                                        className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                        onClick={() => {
                                          if (cartData.user_qty > 1) {
                                            handleQuantity(
                                              cartData.user_qty - 1,
                                              index
                                            );
                                          } else {
                                            toast.error("your cart value is invalid");
                                          }
                                        }}
                                      >
                                        <i className="fs-16 zmdi zmdi-minus" />
                                      </div>
                                      <input
                                        className="mtext-104 cl3 txt-center num-product"
                                        type="number"
                                        name="num-product1"
                                        value={cartData.user_qty}
                                      />
                                      <div
                                        className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                        onClick={() => {
                                          if (
                                            cartData.quantity > cartData.user_qty
                                          ) {
                                            handleQuantity(
                                              cartData.user_qty + 1,
                                              index
                                            );
                                          } else {
                                            toast.error(`This Product is only ${cartData.quantity} Left`);
                                          }
                                        }}
                                      >
                                        <i className="fs-16 zmdi zmdi-plus" />
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="column-6"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {/* <span style={{fontSize:'14px' , fontWeight:800, textTransform:'uppercase'}}>₹</span>  */}
                                    Rs.{total}
                                  </td>

                                  <td
                                    className="column-7"
                                    style={{ marginLeft: "20px" }}
                                    onClick={() => {
                                      handleRemoveItem(cartData.product_id);
                                    }}
                                  > 
                                    <MdDelete />
                                  </td>
                                </tr>
                              );
                            })}

                        </tbody>
                      </table>



                    </div>

                  </div>

                </div>
                <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                  <div
                    className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm"
                    style={{ backgroundColor: "#f6f6f6" }}
                  >
                    <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>
                    <div className="flex-w flex-t bor12 p-b-13">
                      <div className="size-208">
                        <span className="stext-110 cl2">Subtotal:</span>
                      </div>
                      <div className="size-209">
                        <span className="mtext-110 cl2">Rs. {cartPrice}</span>
                      </div>
                    </div>
                    <div className="flex-w flex-m m-r-20 m-tb-5">
                      <input
                        className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"
                        type="text"
                        name="coupon"
                        placeholder="Coupon Code"
                        onBlur={(e) => {
                          checkPromocodeFunc(e.target.value);
                        }}
                        ref={promoCodeInputRef}
                      />
                      <div className="flexdiv" style={{display:'flex'}}>
                        <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                          Apply coupon
                        </div>
                        <Link to='/promocode'>
                          <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                            View coupons
                          </div>
                        </Link>

                      </div>


                    </div>

                    <div className="flex-w flex-t p-t-27 p-b-33">
                      <div className="size-208">
                        <span className="stext-110 cl2">Total:</span>
                      </div>
                      <div className="size-209">
                        <span className="mtext-110 cl2">Rs. {cartPrice}</span>
                      </div>
                      <div className="size-208">
                        <span className="stext-110 cl2">Discount:</span>
                      </div>
                      <div className="size-209">
                        <span className="mtext-110 cl2">
                          - Rs.{promoCode != null ? promoCode.Disamt : 0}
                        </span>
                      </div>
                      <div className="size-208">
                        <span className="stext-110 cl2">You Pay:</span>
                      </div>
                      <div className="size-209">
                        <span className="mtext-110 cl2">
                          Rs. {cartData && promoCode != null
                            ? promoCode.finalamt
                            : cartData?.reduce(
                              (total1, obj) =>
                                parseInt(total1) + parseInt(obj.total_amt),
                              0
                            )}
                        </span>
                      </div>
                    </div>

                    <Link onClick={() =>
                      checkLogin()
                    }>
                      <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                        Proceed to Checkout
                      </button>
                    </Link>
                    <br />
                    <Link to="/">
                      <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>

        )
      }


      {/* <Footer/> */}
    </>
  );
}


export default Shoping_cart;
