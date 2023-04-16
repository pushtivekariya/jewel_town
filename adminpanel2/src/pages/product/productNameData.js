import React, { useEffect, useState } from "react";
import { deleteProdName, getProdNameData } from "../../api/common_api";
import DataTable from "react-data-table-component";
import {  FiDelete } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const ProductNameData = () => {
  const [prodNameData, setProdNameData] = useState([]);
  const [delProdName,setDelProdName] = useState([])

  const getProdName = async () => {
    const getProdnamedata = await getProdNameData();
    setProdNameData(getProdnamedata.result);
  };

  useEffect(() => {
    getProdName();
  }, []);

const deleteProdNameFunction = async(product_name_id)=>{
  // console.log(product_name_id,"ppppppppppppppppp");
  const response = await deleteProdName(product_name_id);
setDelProdName(response.result)
// console.log(response.result,'lllllllll');
// console.log(delProdName,'deleted data');
if (response.status == 1) {
  toast.success('delete successfully')
  window.location.reload()
}

let reloaded = false;

setTimeout(() => {
  if (!reloaded) {
    window.location.reload();
    reloaded = true;
  }
}, 5000);
}

  const column = [
    { name: "Product Name Id", selector: (row) => row.product_name_id },
    {
      name: "Product Name",
      selector: (row) => row.product_names,
    },
  
    {
      name: "   Delete   ",
      selector: (row) => (
        <Link
          type="button"
          name="sub"
          value="update"
          // className="btn btn-primary "
          // onClick={() =>{deleteProdName(row.product_name_id)}}
          onClick = {()=>{
            deleteProdNameFunction(row.product_name_id)
            // toast.success("deleted successfully")
            window.location.reload()
          }}
           style={{color:"#c39587"}}
        >
         
          <FiDelete size="30px"/>
        </Link>
      ),
      width:"100px"
    },
  ];

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingLeft: '10px',
        justifyContent: 'center',
        backgroundColor: "#c39784",
      },
    },
  };
  
  return (
    <>
      <div className="card" style={{ marginLeft: "10px" }}>
      <br/>
        <div className="card-body">
          <h4
            className="card-title"
            style={{ textAlign: "center", fontSize: "30px" }}
          >
          JEWELLERY  PRODUCT <Link to="/product_name">
                <button type="button" style={{marginLeft:"50px"}} className="btn btn-primary mr-2">
                  Add product
                </button>
              </Link>
          </h4>
         
         
          <div className="table-responsive">
            
            <DataTable
              data={prodNameData}
              // title="Product Name List"
              columns={column}
              pagination
              customStyles={tableCustomStyles}

            />
          </div>
          <ToastContainer/>
        </div>
      </div>
    </>
  );
};

export default ProductNameData;
