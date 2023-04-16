import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteSizeApi,
  getProdNameData,
  getSizeData,
  getsizeDataTable,
} from "../../api/common_api";
import DataTable from "react-data-table-component";
import { FiDelete } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

const SizeData = () => {
  const navigate = useNavigate();
  const [sizedata, setSizedata] = useState([]);
  const [deletesize, setDeleteSize] = useState([]);
  const getSizeFunc = async () => {
    const response = await getsizeDataTable();
    setSizedata(response.result);
  };
  useEffect(() => {
    getSizeFunc();
  }, []);

  const deleteSizeFunc = async (size_id) => {
    const response = await deleteSizeApi(size_id);
    console.log(response, "wwwwwwww");
    setDeleteSize(response.result);

    if (response.status == 1) {
      toast.success("size deleted successfully");
    }
    let reloaded = false;

    setTimeout(() => {
      if (!reloaded) {
        window.location.reload();
        reloaded = true;
      }
    }, 5000);
  };

  // const [getProdName, setProdName] = useState([]);
  // const getProdNameFunc = async () => {
  //   const response = await getProdNameData();

  //  setProdName(response.result)

  // };
  // useEffect(() => {
  //   getProdNameFunc();
  // }, []);

  const column = [
    { name: "Size Id ", selector: (row) => row.size_id },
    {
      name: "Product Name ",
      selector: (row) => row.product_names,
      width: "150px",
    },

    { name: "Size", selector: (row) => row.size },
    {
      name: "   Update   ",
      cell: (row) => (
        <button 
          type="button"
          name="sub"
          value="update"
          // className="btn btn-primary "
          onClick={() => {
            navigate("/updatesize", { state: row });
          }}
          style={{color:"#c39587", marginLeft:"20px",border:"none",background:"none"}}
        >
          <FaEdit  size="30px"/>
        </button>
      ),
    },
    {
      name: "   Delete   ",
      cell: (row) => (
        <Link
          type="button"
          name="sub"
          value="update"
          // className="btn btn-primary"
          onClick={() => {
            deleteSizeFunc(row.size_id);
          }}
          style={{color:"#c39587" , marginLeft:"10px"}}
        >
          <FiDelete size="30px" />
        </Link>
      ),
    },
  ];

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
      <div className="card" style={{ marginLeft: "10px" }}>
        <div className="card-body">
          <br />
          <h4
            className="card-title"
            style={{  fontSize: "30px",paddingRight:"20px" }}
          >
            SIZE INFORMATION 
            <Link to="/addSize">
                <button type="button" style={{marginLeft:"50px"}} className="btn btn-primary mr-2">
                 Add Size
                </button>
              </Link>
          </h4>

          <div className="table-responsive">
            <DataTable
              data={sizedata}
              // title="Size List"
              columns={column}
              pagination
              customStyles={tableCustomStyles}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SizeData;
