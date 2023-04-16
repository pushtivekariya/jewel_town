import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getordersInfo, orderDetailsApi, updateorderstatus } from "../../api/common_api";

const Orders = () => {
  const [orderdata, setOrderdata] = useState([]);
  const [outOfdeliveryStatus, setoutOfdeliveryStatus] = useState([]);

const updateStatusFunc = async (order_id,email,user_name)=>{
const response = await updateorderstatus(order_id,email,user_name);
setoutOfdeliveryStatus(response.result);
console.log(response);
if (response.status == 1) {
  toast.success("Order Is Out Of Delivery...")
}
let reloaded = false;

setTimeout(() => {
  if (!reloaded) {
    window.location.reload();
    reloaded = true;
  }
}, 5000);
}

  const getorderDataFunc = async () => {
    const response = await getordersInfo();
    setOrderdata(response.result);
  };

  const [orderDetails, setorderDetails] = useState([]);

  const orderDetailsFunc = async () => {
    const response = await orderDetailsApi();
    setorderDetails(response.result);
  };
  useEffect(() => {
    getorderDataFunc();
    orderDetailsFunc();
   
  }, []);

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
      name: "Out Of Delivery",
      cell: (row) => (
        <Link
          type="button"
          name="sub"
          value="update"
          onClick={() => {
            updateStatusFunc(row.order_id,row.email,row.user_name)
          }}
          style={{ color: "#c39587", marginLeft: "50px" }}
        >
       
          <img src="images/ReadyDisp.jpg" alt="no icons" height="34px" />
        </Link>
      ),
      width: "170px",
    },
  ];
  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        backgroundColor: "#c39784",
      },
    },
  };

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

  return (
    <>
      <div className="card">
        <div className="card-body">
          <br />
          <h4
            className="card-title"
            style={{ marginLeft: "60px", fontSize: "30px" }}
          >
            ORDER INFORMATION
          </h4>

          <div className="table-responsive">
            <DataTable
              data={orderdata}
              columns={columns}
              pagination
              customStyles={tableCustomStyles}
              expandableRows
              expandOnRowClicked
              expandableRowsComponent={ExpandableOrderDetails}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
