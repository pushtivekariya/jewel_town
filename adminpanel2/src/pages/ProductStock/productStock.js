import React, { useEffect, useState } from "react";
import { stockDataApi } from "../../api/common_api";
import DataTable from "react-data-table-component";

const ProductStock = () => {
  const [stockData, setstockData] = useState([]);
  const stockDataFunc = async () => {
    const response = await stockDataApi();
    setstockData(response.result);
  };
  useEffect(() => {
    stockDataFunc();
  }, []);
  const column = [
    {
      name: "Stock Id",
      selector: (row) => row.stock_id,
      width:"100px"
    },
    {
      name: "Product Id",
      selector: (row) => row.product_id,
      width:"130px"
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,

    },
    {
      name: "Added Quantity",
      selector: (row) => row.added_quantity,
      width:"150px"
    },
    {
      name: "Entry Date",
      selector: (row) => row.entry_date,
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

  return (
    <>
      <div className="card">
        <div className="card-body">
          <br />
          <h4
            className="card-title"
            style={{ marginLeft: "60px", fontSize: "30px" }}
          >
            STOCK HISTORY 
          </h4>

          <div className="table-responsive">
            <DataTable
              data={stockData}
              columns={column}
              pagination
              customStyles={tableCustomStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductStock;
