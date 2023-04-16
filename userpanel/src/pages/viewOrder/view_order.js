import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  cancelOrder,
  generateInvoice,
  getOrderData,
} from "../../api/common_api";

import { MdCancelPresentation, MdFileDownloadOff } from "react-icons/md";
import {RiCheckDoubleFill} from 'react-icons/ri'
import { ImFolderDownload } from "react-icons/im";
import { toast } from "react-toastify";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import Sidebar from "../user_account/sidebar";

function View_order() {
  const login = JSON.parse(localStorage.getItem("login_info"));

  const [OrderData, setOrderData] = useState([]);
  // const [InvoiceData, setInvoiceData] = useState([]);

  console.log(OrderData, "oooo");
  const getOrderDataFunction = async () => {
    const response = await getOrderData(login[0].user_id);
    console.log(response.result, "rrr");
    setOrderData(response.result);
  };

  // const getInvoiceDataFunction = async () => {
  //     const response = await generateInvoice()
  //     console.log(response, "response");
  //     setInvoiceData(response)
  // }

  useEffect(() => {
    getOrderDataFunction();
    // getInvoiceDataFunction()
  }, []);

  const invoiceGenerate = async (data) => {
    const response = await generateInvoice(data);
    if (response.status == 1) {
    //   toast.success("Invoice Generated Please Check Your Mail");
    } else {
      toast.error("Invoice Not Generated");
    }
  };

  // console.log(OrderData.result, 'orderdataaaaa');
  const column = [
    {
      name: "order id",
      width: "100px",
      selector: (row) => row.order_id,
    },
    {
      name: "Order Date",
      selector: (row) => row.order_date,
      width: "140px",
    },
    {
      name: "Total Amount",
      selector: (row) => row.final_amount,
      width: "120px",
    },
    {
      name: "Transaction Id",
      selector: (row) => row.transaction_id,
      width: "190px",
    },
    {
      name: "Payment Method",
      cell: (row) => <p>Online</p>,
      width: "140px",
    },
    {
      name: "Download",
      cell: (row) => (
        <>
          {row.order_status == 1 ? (
            <MdFileDownloadOff size="30px" style={{ marginLeft: "15px" }} />
          ) : (
            <Link
              type="button"
              // name="sub"
              value="download"
              // onClick={async () => {
              //     const response = await generateInvoice(row);
              //     // window.location.reload();
              //     setInvoiceData(response)
              //     console.log(response, 'responseeeeeeeeee');
              //     console.log(row, 'rowwwww');
              //     if (response.status == 1) {
              //         toast.success("Invoice Generated please check your mail.....")
              //     }
              // }}

              onClick={() => {
                invoiceGenerate(row);
                toast.success("Invoice Generated Please Check Your Mail");
              }}
              style={{ color: "#c39587" }}
            >
              <ImFolderDownload size="30px" style={{ marginLeft: "15px" }} />
            </Link>
          )}
        </>
      ),
      width: "120px",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {row.order_status == 1 ? (
            <p style={{ marginLeft: "50px" }}>Canceled</p>
          ) : row.order_status == 4 ? (
                <RiCheckDoubleFill
                size="30px"
                style={{ marginLeft: "60px" }}
                />
          ) : (
            <Link
              type="button"
              // name="sub"
              value="download"
              onClick={async () => {
                const response = await cancelOrder(row);
                // window.location.reload();

                console.log(response, "responsee");
                console.log(row, "rowwwww");
                if (response?.status == 1) {
                  toast.success("Your Order is cancel... ");
                  getOrderDataFunction();
                } else if (response?.status == 3) {
                  toast.success(
                    "Your order is out of delivered. so, you can not cancel your order"
                  );
                } else {
                  toast.error("not cancel order");
                }
              }}
              style={{ color: "#c39587" }}
            >
              <MdCancelPresentation
                size="30px"
                style={{ marginLeft: "60px" }}
              />
            </Link>
          )
          
          }
        </>
      ),
      width: "180px",
    },
  ];

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

  return (
    <>
      <div className="row main_row">
        <div className="col-3 navigation">
          <Sidebar />
        </div>
        <div className="col-8 content" style={{ paddingTop: "1px" }}>
          {/* <Header/> */}
          <center>
            <h4 style={{ color: "black", fontWeight: 600, marginTop: "20px" }}>
              Order History
            </h4>
            <div style={{ marginTop: "50px" }}>
              <DataTable
                data={OrderData}
                columns={column}
                customStyles={tableCustomStyles}
                pagination
              />
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

export default View_order;
