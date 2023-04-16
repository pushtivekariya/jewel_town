import React, { useEffect, useState } from "react";
import { BiCalendar, BiStopwatch } from "react-icons/bi";
import { FaBox, FaPercent, FaUserAlt } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { APIRoutes } from "../../constant/api_url";

import {
  getImageApi,
  lessProductQty,
  totalOffersApi,
  totalOrderApi,
  totalProduct,
  totalUserApi,
} from "../../api/common_api";
// import ProdSlide from "./productSlide/prodSlide";
import DataTable from "react-data-table-component";
import Datachart from "./datachart";

const Home = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [lessprodQty, setlessprodqty] = useState([]);
  const [order, setorder] = useState([]);
  const [offers, setOffers] = useState([]);

  const lessqty = async () => {
    const response = await lessProductQty();
    setlessprodqty(response.result);
  };

  useEffect(() => {
    lessqty();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  const login_details = JSON.parse(localStorage.getItem("Login_info"));

  const totalUserfunc = async () => {
    const response = await totalUserApi();
    console.log(response.result, "respoooo");
    setUser(response.result);
  };

  const totalProdFunc = async () => {
    const response = await totalProduct();
    console.log(response, "datattt");
    setProduct(response.result);
  };

  const totalOrder = async () => {
    const response = await totalOrderApi();
    setorder(response.result);
  };

  const TotalOffers = async () => {
    const response = await totalOffersApi();
    setOffers(response.result);
  };

  const [images, setImages] = useState([]);
  const getImageFunc = async () => {
    const response = await getImageApi();
    setImages(response.result);
  };

  const column = [
    { name: "product Id ", selector: (row) => row.product_id, width: "100px" },
    {
      name: "Product Name",
      selector: (row) => row.product_names,
      width: "130px",
    },
    {
      name: "Short Description",
      selector: (row) => row.short_description,
      width: "180px",
    },
    { name: "Gender", selector: (row) => row.gender, width: "100px" },
    {
      name: "Jewellary Type",
      selector: (row) => row.jwellary_type,
      width: "130px",
    },
    { name: "Price", selector: (row) => row.price, width: "90px" },
    { name: "Quantity", selector: (row) => row.quantity, width: "90px" },
    {
      name: "Add Quantity",
      cell: (row) => (
        <button
          style={{
            color: "#c39587",
            border: "none",
            background: "none",
            marginLeft: "90px",
          }}
          onClick={() => {
            navigate("/addProdQty", { state: row });
          }}
        >
          <AiOutlineAppstoreAdd size={30} />
        </button>
      ),
      width: "290px",
      marginRight: "290px",
    },
  ];
  useEffect(() => {
    totalUserfunc();
    totalProdFunc();
    getImageFunc();
    totalOrder();
    TotalOffers();
  }, []);

  const ExpandableImages = ({ data }) => {
    console.log(data, "data");
    return (
      <>
        {images?.map((image) => {
          if (data.product_id == image.product_id) {
            return (
              <img
                src={`${APIRoutes.APIHOSTNAME}images/${image.image_url}`}
                alt="no "
                height="90px"
              />
            );
          }
        })}
      </>
    );
  };
  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingLeft: "10px",
        justifyContent: "center",
        backgroundColor: "#c39784",
      },
    },
  };
  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          {/* dashbord header */}
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                  {login_details?.map((log_name) => {
                    return (
                      <h3 className="font-weight-bold">
                        Welcome : {log_name.admin_name}
                      </h3>
                    );
                  })}
                  <h6 className="font-weight-normal mb-0">
                    All systems are running smoothly !
                    {/* <span className="text-primary">3 unread alerts!</span> */}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          {/* card images */}
          <div className="row">
            <div
              className="col-md-6 grid-margin stretch-card"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="card tale-bg"
                style={{ background: "none", borderRadius: "20px" }}
              >
                {/* <div className="card-people mt-auto"  > */}
                <img
                  src="images/dashboard/card.png"
                  style={{
                    height: "320px",
                    borderRadius: "20px",
                  }}
                  alt="people"
                />
                <div className="weather-info">
                  <div
                    className="d-flex"
                    style={{ paddingTop: "60px", paddingRight: "60px" }}
                  >
                    {}
                    <div>
                      <h2 className="mb-0 " style={{ fontWeight: "900" }}>
                        <BiCalendar
                          style={{ marginRight: "20px", marginBottom: "0px" }}
                        />
                        {/* <i className="icon-sun mr-2" /> */}
                        {day}
                        <sup>th</sup>
                        {month},{year}
                      </h2>
                      <h2 className="mb-0 " style={{ fontWeight: "1000" }}>
                        <BiStopwatch
                          style={{
                            height: "80px",
                            marginRight: "20px",
                            marginBottom: "10px",
                            fontWeight: "1000",
                          }}
                        />
                        {hours}:{minutes}:{second}
                      </h2>
                    </div>
                    <div className="ml-2">
                      <h4 className="location font-weight">INDIA</h4>
                      {/* <h6 className="font-weight-normal">India</h6> */}
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin transparent">
              <div className="row">
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div
                    className="card card-tale"
                    style={{ backgroundColor: "#c39587" }}
                  >
                    <div className="card-body">
                      <h4 className="mb-4">Total Registered User</h4>
                      {user?.map((totalu) => {
                        return (
                          <>
                            <div className="d-flex">
                              <p
                                className="fs-30 mb-2"
                                style={{ marginTop: "7px" }}
                              >
                                {totalu.total_customers}
                              </p>
                              {/* <FaUserAlt
                                style={{ marginLeft: "200px" }}
                                size="30px"
                              /> */}
                              <FaUserAlt
                                size={30}
                                style={{ marginLeft: "170px" }}
                              />
                            </div>
                            <Link
                              to="/user_information"
                              style={{
                                color: "black",
                                textDecoration: "underline",
                              }}
                            >
                              See All Users
                            </Link>
                          </>
                        );
                      })}
                      {/* <p>10.00% (30 days)</p> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div
                    className="card card-light-blue"
                    style={{ backgroundColor: "#c39587" }}
                  >
                    <div className="card-body">
                      <h4 className="mb-4">Total Products</h4>
                      <p className="fs-30 mb-2">
                        {product?.map((Totalprod) => {
                          return (
                            <>
                              <div className="d-flex">
                                <p
                                  className="fs-30 mb-2"
                                  style={{ marginTop: "7px" }}
                                >
                                  {Totalprod.total_Product}
                                </p>
                                <FaBox style={{ marginLeft: "150px" }} />
                              </div>
                              <Link
                                to="/productdata"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                  textDecoration: "underline",
                                }}
                              >
                                See All Products
                              </Link>
                            </>
                          );
                        })}
                      </p>
                      {/* <p>22.00% (30 days)</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div
                    className="card card-light-blue"
                    style={{ backgroundColor: "#c39587" }}
                  >
                    <div className="card-body">
                      <h4 className="mb-4">Total Arrived Orders</h4>
                      <p className="fs-30 mb-2">
                        {order?.map((TotalOrder) => {
                          return (
                            <>
                              <div className="d-flex">
                                <p
                                  className="fs-30 mb-2"
                                  style={{ marginTop: "7px" }}
                                >
                                  {TotalOrder.total_order}
                                </p>
                                <BsListCheck style={{ marginLeft: "160px" }} />
                              </div>
                              <Link
                                to="/orderInformation"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                  textDecoration: "underline",
                                }}
                              >
                                See All Orders
                              </Link>
                            </>
                          );
                        })}
                      </p>
                      {/* <p>22.00% (30 days)</p> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div
                    className="card card-light-blue"
                    style={{ backgroundColor: "#c39587" }}
                  >
                    <div className="card-body">
                      <h4 className="mb-4">Total Offers</h4>
                      <p className="fs-30 mb-2">
                        {offers?.map((TotalOffer) => {
                          return (
                            <>
                              <div className="d-flex">
                                <p
                                  className="fs-30 mb-2"
                                  style={{ marginTop: "7px" }}
                                >
                                  {TotalOffer.total_offer}
                                </p>
                                <FaPercent style={{ marginLeft: "160px" }} />
                              </div>
                              <Link
                                to="/promocodesdata"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                  textDecoration: "underline",
                                }}
                              >
                                See All Offers
                              </Link>
                            </>
                          );
                        })}
                      </p>
                      {/* <p>22.00% (30 days)</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-center font-weight-bold" style={{marginBottom:"60px"}}> HISTORY OF THE MONTH</h2>
<Datachart/>
          {/* <ProdSlide /> */}
          {/* data table for less product quantity */}

          <div className="card" style={{ marginLeft: "10px" }}>
            <div className="card-body">
              <br />
              <h4
                className="card-title  text-center"
                style={{
                  fontSize: "30px",
                  paddingRight: "20px",
                }}
              >
                LESS QUANTITY PRODUCTS
                {/* <Link to="/home">
                <button type="button" style={{marginLeft:"50px"}} className="btn btn-primary mr-2">
                 Add qty
                </button>
              </Link> */}
              </h4>

              <div className="table-responsive">
                <DataTable
                  data={lessprodQty}
                  columns={column}
                  pagination
                  expandableRows
                  expandOnRowClicked
                  customStyles={tableCustomStyles}
                  expandableRowsComponent={ExpandableImages}
                />
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
        {/* partial:partials/_footer.html */}
        <footer className="footer">
          <div className="d-sm-flex justify-content-center justify-content-sm-between">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
              Copyright © 2023. Premium <a>Jewel Town Admin Panel</a> All rights
              reserved.
            </span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              Hand-crafted &amp; made with{" "}
              <i className="ti-heart text-danger ml-1" />
            </span>
          </div>
          <div className="d-sm-flex justify-content-center justify-content-sm-between">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
              Managed by <a>Royal Jewellers</a>
            </span>
          </div>
        </footer>
        {/* partial */}
      </div>
    </>
  );
};

export default Home;
