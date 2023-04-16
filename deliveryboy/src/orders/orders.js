import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CgLogOff } from "react-icons/cg";
import { RiSendPlaneFill } from "react-icons/ri";
import { ImEnter } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import {
  OrderDetailsApi,
  dispatchedOrderApi,
  sendOtpApi,
} from "../api/common_api";
import { toast } from "react-toastify";
const Orders = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("DeliveryBoyLogin_Info");
    navigate("/");
    window.location.reload();
  };

  const [orderData, setorderData] = useState([]);
  const [orderDetails, setorderDetails] = useState([]);

  const orderdataFunc = async () => {
    const response = await dispatchedOrderApi();
    setorderData(response.result);
  };
  console.log(orderData, "orderdata");
  const orderDetailFunc = async () => {
    const response = await OrderDetailsApi();
    setorderDetails(response.result);
  };
  console.log(orderDetails, "orderdetails");

  useEffect(() => {
    orderdataFunc();
    orderDetailFunc();
  }, []);

  //   send otp function
  const sendOtpFunc = async (data) => {
    const response = await sendOtpApi(data);
    console.log(data, "email");
    console.log(response, "otp response");
    if (response.status == 1) {
      toast.success("OTP Sent Successfully");
    
      window.location.reload()
    } else {
      toast.error("otp not sent");
    }
  };
  const columns = [
    {
      name: "Order Id",
      selector: (row) => row.order_id,
      width: "90px",
    },
    {
      name: "User Id",
      selector: (row) => row.user_id,
      width: "90px",
    },
    {
      name: "Total Amount",
      selector: (row) => row.total_amount,
      width: "150px",
      sortable: true,
    },
    {
      name: "Discount Amount",
      selector: (row) => row.discount_amount,
      width: "160px",
    },
    {
      name: "Order Date",
      selector: (row) => row.order_date,
      width: "130px",
      sortable: true,
    },
    {
      name: "Transaction Id",
      selector: (row) => row.transaction_id,
      width: "140px",
    },
    {
      name: "User Name",
      selector: (row) => row.user_name,
      width: "130px",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "220px",
    },
    {
      name: "Contact Number",
      selector: (row) => row.contact_no,
      width: "150px",
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      width: "110px",
      sortable: true,
    },
    {
      name: "House Number",
      selector: (row) => row.house_no,
      width: "140px",
    },
    {
      name: "Street Name",
      selector: (row) => row.street_name,
      width: "120px",
    },
    {
      name: "Area",
      selector: (row) => row.area,
      width: "90px",
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      width: "90px",
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      width: "90px",
      sortable: true,
    },

    {
      name: "Pincode",
      selector: (row) => row.pincode,
    },
    {
      name: "Send OTP",
      cell: (row) => (
        <>
          <Link type="button" onClick={() => sendOtpFunc(row)}>
            <RiSendPlaneFill size={30} color="black" />
          </Link>
        </>
      ),
    },
    {
      name: "Enter Otp",
      cell: (row) => (
        <>
          <button
            onClick={() => {
              navigate("/enterOtp", { state: row });
            }}
            style={{ color: "#c39587", border: "none", background: "none" }}
          >
            <ImEnter size={30} color="black" />
          </button>
        </>
      ),
    },
  ];
  const ExpandableOrderDetails = ({ data }) => {
    console.log(data, "datttaa");
    return (
      <>
        <table
          className="table table-md"
          style={{ width: "1400px", marginLeft: "45px" }}
        >
          <thead>
            <tr style={{ background: "#000", color: "#fff" }}>
              <th scope="col">Order Detail Id</th>
              <th scope="col">Order Id</th>
              <th scope="col">Product Id</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Product Name</th>
              <th scope="col">Jewellary Type</th>
              <th scope="col">Size</th>
            </tr>
          </thead>

          {orderDetails?.map((orderData) => {
            console.log(orderData, "order data");
            if (data.order_id == orderData.order_id) {
              return (
                <>
                  <tbody style={{ fontSize: "14px", background: "#c39785" }}>
                    <tr>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.order_detail_id}
                      </th>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.order_id}
                      </th>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.product_id}
                      </th>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.price}
                      </th>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.user_qty}
                      </th>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.total_amt}
                      </th>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.product_names}
                      </th>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.jwellary_type}
                      </th>
                      <th style={{ fontWeight: "normal" }} scope="row">
                        {orderData.jwellary_size}
                      </th>
                    </tr>
                  </tbody>
                </>
              );
            }
          })}
        </table>
      </>
    );
  };
  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        backgroundColor: "#c39784",
      },
    },
  };

  return (
    <>
      <div className="text-right" style={{position:"fixed"}}>
        <button
          onClick={() => logout()}
          className="btnlogout"
          style={{
            background: "#c39784",
            border: "none",
            borderRadius: "50%",
            margin: "20px",
          }}
        >
          <CgLogOff size={40} />
        </button>
      </div>
      <div
        className="container"
        style={{
          position: "absolute",
          marginTop: "80px",
          marginLeft: "90px",
          width: "100%",
          marginRight:"90px"
        }}
      >
        <h1 className="text-center">ORDER INFORMATION</h1>
        <DataTable
          data={orderData}
          columns={columns}
        //   pagination
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={ExpandableOrderDetails}
          customStyles={tableCustomStyles}
        />
      </div>
    </>
  );
};

export default Orders;
