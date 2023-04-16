import React, { useState, useEffect } from "react";
import "./checkout.css";
import Select from "react-select";
import { toast } from "react-toastify";
import useRazorpay from "react-razorpay";
import { checkout, shipaddress } from "../../api/common_api";
import { Link } from "react-router-dom";
import UserProfileForm from "../userprofile/updateProfileForm";
import { apiRoutes } from "../../constant/api_url";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import DataTable from "react-data-table-component";
import { positions } from "@mui/system";

function Checkout() {
  const [userid, setuserid] = useState([]);
  const navigateToFormStep = (stepNumber) => {
    document.querySelectorAll(".form-step").forEach((formStepElement) => {
      formStepElement.classList.add("d-none");
    });

    document
      .querySelectorAll(".form-stepper-list")
      .forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove(
          "form-stepper-active",
          "form-stepper-completed"
        );
      });

    document.querySelector("#step-" + stepNumber).classList.remove("d-none");

    const formStepCircle = document.querySelector(
      'li[step="' + stepNumber + '"]'
    );

    formStepCircle.classList.remove(
      "form-stepper-unfinished",
      "form-stepper-completed"
    );
    formStepCircle.classList.add("form-stepper-active");

    for (let index = 0; index < stepNumber; index++) {
      const formStepCircle = document.querySelector('li[step="' + index + '"]');

      if (formStepCircle) {
        formStepCircle.classList.remove(
          "form-stepper-unfinished",
          "form-stepper-active"
        );
        formStepCircle.classList.add("form-stepper-completed");
      }
    }
  };

  document
    .querySelectorAll(".btn-navigate-form-step")
    .forEach((formNavigationBtn) => {
      formNavigationBtn.addEventListener("click", () => {
        const stepNumber = parseInt(
          formNavigationBtn.getAttribute("step_number")
        );

        navigateToFormStep(stepNumber);
      });
    });

  const [userOrderdata, setuserorderdata] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [address, setAddress] = useState([]);


  const Razorpay = useRazorpay();

  const login = JSON.parse(localStorage.getItem("login_info"));
  console.log(login[0].contact_no, "username");

  const cart_lists = JSON.parse(localStorage.getItem("cart_list"));
  const DiscountData = JSON.parse(localStorage.getItem("promocode_resp"))

  console.log(DiscountData, "ddd");
  // const promocode_resp = JSON.parse(localStorage.getItem('promocode_resp')) || null;
  const [amount, setAmount] = useState([])

  function handleRemoveorder(itemId) {
    const updatedorder = cartData.filter((cartData) => cartData.product_id !== itemId
    );
    setCartData(updatedorder);
    localStorage.setItem("cart_list", JSON.stringify(updatedorder));
    window.location.reload();
  }


  const discount_data = {
    discount_amt: DiscountData === null ? 0 : DiscountData.Disamt,
    final_amt: DiscountData === null ? cartPrice : DiscountData.finalamt,
    promocode: DiscountData === null ? null : DiscountData.promocode_name
  }
  const Billamount = () => {

    setAmount(discount_data);
  }
  console.log(amount, "aaaa");
  console.log(login[0], "login");
  useEffect(() => {
    setuserorderdata(login[0]);
    Billamount()
  }, []);

  const userdataChange = (e) => {
    setuserorderdata({ ...userOrderdata, [e.target.name]: e.target.value });
  };
  console.log(address, "aaaaaaaaaaaaaaaa");
  const [cartData, setCartData] = useState(cart_lists);
  const [orderData, setOrderData] = useState();

  const totalamt = () => {
    let price = 0;
    cartData.forEach((element) => {
      // console.log(element,'eeeeeeeeeeeeeeeeeeeee');
      price += element.price * element.user_qty;
      // price += 100 * 100;
    });
    setCartPrice(price);
    console.log(cartPrice, "ppppppppppppppp");
  };
  useEffect(() => {
    totalamt();
  }, [cartData]);

  // useEffect(()=> {
  // setCartPrice(cartData && promocode_resp != null ?promocode_resp.finalamt :  cartData?.reduce((total1,obj) => total1 + parseInt(obj.total_amt),0) )
  // },[])

  useEffect(() => {
    const data = cart_lists
      ?.filter((data) => data.email == login[0]?.email)
      .map((datas) => {
        return datas;
        
      });
    console.log(data, "data");
    console.log(data.email,"email");
    setCartData(data);
  }, []);

  const uid = () => {
    console.log(login[0].user_id, "llllll");
    setuserid(login[0].user_id);
  };
  useEffect(() => {
    uid();
  }, []);

  // console.log(pomocodedata, "data");



  console.log(userid, "useriiiiidddd");
  const submitFunction = () => {
    //  form Validation

    const options = {
      key: "rzp_test_R1c6XSSbNukNsh",

      amount: ((DiscountData === null ? cartPrice : amount.final_amt) * 100).toString(),
      currency: "INR",
      name: "Demo",
      description: "Test Transaction",
      image: "images/icons/logoUser.png",
      order_id: "",
      handler: async function (response) {

        if (login == null) {
          toast.error("please login..")
        }
        else {
          let obj = {
            user_id: login[0].user_id,

            userInfo: {
              user_name: login[0].user_name,
              email: login[0].email,
              contact_no: login[0].contact_no,
              gender: login[0].gender,
            },
            Address: address,

            orderInfo: {
              total_amount: cartPrice,
              transaction_id: response.razorpay_payment_id,
            },
            final_amount: DiscountData === null ? cartPrice : amount.final_amt,
            orderDetail: cartData,
            promocode: DiscountData === null ? null : amount.promocode,
            discount_amount: DiscountData === null ? 0 : amount.discount_amt
            // discount_amount :
          };
          //billing form submit
          // alert(response)

          const responses = await checkout(obj);
          if (responses.status == 1) {
            localStorage.removeItem("promocode_resp")
            toast.success("order placed successfully")
            // handleRemoveorder();      
          }

         
            const cartList = JSON.parse(localStorage.getItem("cart_list"));
            const updatedCartList = cartList.filter(item => item.email !== login[0]?.email);
            localStorage.setItem("cart_list", JSON.stringify(updatedCartList));
            window.location.reload(); 
            window.location.replace("/");
          
          console.log(obj.user_id);
          console.log(obj.userInfo);
          console.log(obj.Address);
          console.log(obj.orderInfo);
          console.log(obj.orderDetail);
          console.log(obj.final_amount);
        }



      },
      prefill: {
        name: "Xyz",
        email: "test@gmail.com",
        contact: "9554645986",
      },

      theme: {
        color: "#c39587",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
    });

    rzp1.open();
  };

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const changeAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  console.log(amount, 'amount');

  // const subAddress = async () => {
  //   // uid()
  //   console.log(address);
  //   // const result = await shipaddress(address)
  //   const result = await shipaddress({ user_id: userid, house_no: address.house_no, street_name: address.street_name, area: address.area, city: address.city, state: address.state, country: address.country, pincode: address.pincode })
  //   console.log(address, "addressssss");
  //   if (result.status === 1) {
  //     toast.success("adress added successfully.......")
  //   }
  // }

  console.log(amount, "cartData");
  // let total = parseInt(cartData?.user_qty) * parseInt(cartData?.price);
  // console.log(total, "total");
  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingLeft: "0 8px",
        justifyContent: "center",
        backgroundColor: "#c39784",
      },
    },
  };
  const column = [
    {
      name: "View",
      cell: (row) => {
        return (
          <>
            <img
              src={`${apiRoutes.APIHOSTNAME}images/${row.image_url}`}
              alt="IMG"
              style={{
                margin: "10px",
                borderRadius: "10px",
                height: "90px",
                width: "90px",
              }}
            />
          </>
        );
      },
      width: "150px",
    },
    {
      name: "Product",
      selector: (row) => row.product_names,
      width: "100px",
    },
    {
      name: "Size",
      cell: (row) => {
        if (row.size == "") {
          return <p>-</p>
        } else {
          return <p>{row.size}</p>
        }
      },
      width: "80px",
    },
    {
      name: "Quantity",
      selector: (row) => row.user_qty,
      width: "100px",
    },
    {
      name: "Price",
      cell: (row) => {
        return (
          <>
            <p>Rs.{row.price}</p>
          </>
        );
      },
      width: "100px",
    },
    {
      name: "Total",
      cell: (row) => {
        return (
          <>
            <p>Rs.{row.total_amt}</p>
          </>
        );
      },
      width: "100px",
    },
  ];


  return (
    <>
      {/* <Header/> */}
      <div className="mainscreen">
        <div className="card">
          <div className="rightside">
            <div>
              <div id="multi-step-form-container">
                {/* Form Steps / Progress Bar */}
                <ul className="form-stepper form-stepper-horizontal text-center mx-auto pl-0">
                  {/* Step 1 */}
                  <li
                    className="form-stepper-active text-center form-stepper-list"
                    step={1}
                  >
                    <a className="mx-2">
                      <span className="form-stepper-circle">
                        <span>1</span>
                      </span>
                      <div className="label">Personal Details</div>
                    </a>
                  </li>
                  {/* Step 2 */}
                  <li
                    className="form-stepper-unfinished text-center form-stepper-list"
                    step={2}
                  >
                    <a className="mx-2">
                      <span className="form-stepper-circle text-muted">
                        <span>2</span>
                      </span>
                      <div className="label text-muted">Shipping Profiles</div>
                    </a>
                  </li>
                  {/* Step 3 */}
                  <li
                    className="form-stepper-unfinished text-center form-stepper-list"
                    step={3}
                  >
                    <a className="mx-2">
                      <span className="form-stepper-circle text-muted">
                        <span>3</span>
                      </span>
                      <div className="label text-muted">Order Details</div>
                    </a>
                  </li>
                </ul>
                {/* Step Wise Form Content */}
                <form
                  id="userAccountSetupForm"
                  name="userAccountSetupForm"
                  encType="multipart/form-data"
                  method="POST"
                >
                  {/* Step 1 Content */}
                  <section id="step-1" className="form-step">
                    <h4 className="font-normal">Personal Details</h4>
                    <br />
                    {/* Step 1 input fields */}

                    <form>
                      <lable>Name</lable>
                      <input
                        type="text"
                        className="inputbox"
                        value={userOrderdata.user_name}
                        name="user_name"
                        required=""
                        onChange={(e) => userdataChange(e)}
                      />
                      <br />
                      <lable>Email</lable>
                      <input
                        type="text"
                        className="inputbox"
                        value={userOrderdata.email}
                        name="email"
                        required=""
                        onChange={(e) => userdataChange(e)}
                      />
                      <br />
                      <lable>Phone Number</lable>
                      <input
                        type="text"
                        className="inputbox"
                        value={userOrderdata.contact_no}
                        name="contact_no"
                        required=""
                        onChange={(e) => userdataChange(e)}
                      />
                      <br />
                      <lable>Gender</lable>
                      <input
                        type="text"
                        className="inputbox"
                        value={userOrderdata.gender}
                        name="gender"
                        required=""
                        onChange={(e) => userdataChange(e)}
                      />
                      <br />
                    </form>

                    <div className="mt-3">
                      {/* <Link to='/userprofileform'>
                        <button
                          className="btn btn-navigate-form-step"
                          type="button"
                          style={{ marginLeft: '20px' }}
                        >
                          Edit Details
                        </button>

                      </Link> */}
                      <button
                        className="btn btn-navigate-form-step"
                        type="button"
                        step_number={2}
                      >
                        Next
                      </button>
                    </div>
                  </section>
                  {/* Step 2 Content, default hidden on page load. */}

                  <section id="step-2" className="form-step d-none">
                    <h2 className="font-normal">Shipping Details</h2>
                    {/* Step 2 input fields */}

                    <div className="mt-3">
                      <form>
                        <lable>Apartment/House/Flat No.</lable>
                        <input
                          type="text"
                          className="inputbox"
                          value={address.house_no}
                          name="house_no"
                          required=""
                          onChange={(e) => changeAddress(e)}
                        />
                        <br />
                        <lable>Street name</lable>
                        <input
                          type="text"
                          className="inputbox"
                          value={address.street_name}
                          name="street_name"
                          required=""
                          onChange={(e) => changeAddress(e)}
                        />
                        <br />
                        <lable>Area</lable>
                        <input
                          type="text"
                          className="inputbox"
                          value={address.area}
                          name="area"
                          required=""
                          onChange={(e) => changeAddress(e)}
                        />
                        <br />
                        <lable>City</lable>
                        <input
                          type="text"
                          className="inputbox"
                          value={address.city}
                          name="city"
                          required=""
                          onChange={(e) => changeAddress(e)}
                        />
                        <br />
                        <label>State</label>
                        <input
                          type="text"
                          className="inputbox"
                          value={address.state}
                          name="state"
                          required=""
                          onChange={(e) => changeAddress(e)}
                        />
                        <br />
                        <label>Pincode</label>
                        <input
                          type="text"
                          className="inputbox"
                          value={address.pincode}
                          name="pincode"
                          required=""
                          onChange={(e) => changeAddress(e)}
                        />
                        <br />
                      </form>
                    </div>

                    <div className="mt-3">
                      <button
                        className="btn btn-navigate-form-step"
                        type="button"
                        step_number={1}
                      >
                        Prev
                      </button>
                      <button
                        className="btn btn-navigate-form-step"
                        type="button"
                        value="submit"
                        step_number={3}
                      >
                        Next
                      </button>
                    </div>
                  </section>
                  {/* Step 3 Content, default hidden on page load. */}
                  <section id="step-3" className="form-step d-none">
                    <h2 className="font-normal">Your Order</h2>
                    {/* Step 3 input fields */}
                    <div className="mt-3">
                      <form className="bg0 p-t-75 p-b-85">
                        <DataTable
                          data={cartData}
                          columns={column}
                          customStyles={tableCustomStyles}
                        />
                        <div className=" container" style={{ marginLeft: "500px" }} >
                          {/* <div className="card-header ">BILLING DETAIL</div> */}
                          <ul className="list-group row" style={{ width: "220px" }}>

                            <li className="list-group-item" style={{ fontSize: "15px" }}><span style={{ color: "black", fontFamily: "AGaramondPro-Regular" }}>AMOUNT</span>   : <span style={{ textAlign: "right" }}>Rs.{cartPrice}</span></li>
                            <li className="list-group-item" style={{ fontSize: "15px" }}><span style={{ color: "black", fontFamily: "AGaramondPro-Regular" }}>DISCOUNT</span> : - <span>Rs.{DiscountData === null ? 0 : amount.discount_amt}</span> </li>
                            <li className="list-group-item" style={{ fontSize: "15px" }}><span style={{ color: "black", fontFamily: "AGaramondPro-Regular" }}>TOTAL</span> : <span>Rs.{DiscountData === null ? cartPrice : amount.final_amt}</span></li>




                          </ul>

                        </div>

                        {/* </div> */}

                        {/* </div> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* </div> */}
                      </form>
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn btn-navigate-form-step"
                        type="button"
                        step_number={2}
                      >
                        Prev
                      </button>
                      <button
                        className="btn submit-btn"
                        type="button"
                        onClick={() => {
                          submitFunction();
                        }}
                      >
                        place Order
                      </button>
                    </div>
                  </section>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
      {/* <Footer/> */}
    </>
  );
}

export default Checkout;
