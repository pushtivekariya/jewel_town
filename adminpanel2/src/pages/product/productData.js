import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProdApi,
  getImageApi,
  getproddataapi,
} from "../../api/common_api";
import { APIRoutes } from "../../constant/api_url";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductData = () => {
  const navigate = useNavigate();
  const [proddata, setproddata] = useState([]);
  const [images, setImages] = useState([]);
  const [deleteProd, setdeleteProd] = useState([]);
  const getProdListfunc = async () => {
    const response = await getproddataapi();
    setproddata(response.result);
  };

  const getImageFunc = async () => {
    const response = await getImageApi();
    setImages(response.result);
  };
  useEffect(() => {
    getProdListfunc();
    getImageFunc();
  }, []);

  const deleteProdFunc = async (product_id) => {
    const response = await deleteProdApi(product_id);
    setdeleteProd(response.result);
    if (response.status == 1) {
      toast.success("product deleted successfully");
    }

    let reloaded = false;

    setTimeout(() => {
      if (!reloaded) {
        window.location.reload();
        reloaded = true;
      }
    }, 5000);
  };

  const column = [
    { name: "Product Id", selector: (row) => row.product_id, width: "150px" },

    {
      name: "Product Name Id",
      selector: (row) => row.product_names,
      width: "190px",
    },
    {
      name: "Short Description",
      selector: (row) => row.short_description,
      width: "400px",
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      width: "90px",
    },
    {
      name: "Jwellary Type",
      selector: (row) => row.jwellary_type,
      width: "160px",
    },
    {
      name: "Jwellary Purity",
      selector: (row) => row.jewellary_purity,
      width: "160px",
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
      width: "120px",
    },

    {
      name: "Price",
      selector: (row) => row.price,
      width: "110px",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      width: "140px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },

   
    {
      name: "   Update   ",
      cell: (row) => (
        <>
          <button
            type="button"
            name="sub"
            value="update"
            // className="btn btn-primary "
            onClick={() => {
              navigate("/updateproduct", { state: row });
            }}
            style={{ color: "#c39587", border: "none", background: "none" }}
          >
            <FaEdit size="30px" />
          </button>
        </>
      ),
      width: "100px",
    },
    {
      name: "   Delete   ",
      cell: (row) => (
        <>
          <Link
            type="button"
            // name="sub"
            value="delete"
            // className="btn btn-primary "
            onClick={() => {
              deleteProdFunc(row.product_id);
              window.location.reload();
            }}
            style={{ color: "#c39587" }}
          >
            <FiDelete size="30px" />
          </Link>
        </>
      ),
      width: "90px",
    },
  ];

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
        fontSize: "20px",
        fontWeight: "bold",
        paddingLeft: "0 8px",
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
            style={{ fontSize: "30px", marginLeft: "60px" }}
          >
            PRODUCT INFORMATION
            <Link to="/addproduct">
              <button
                type="button"
                style={{ marginLeft: "50px" }}
                className="btn btn-primary mr-2"
              >
                Add Product
              </button>
            </Link>
          </h4>

          <div className="table-responsive">
            <DataTable
              data={proddata}
              // title="Product Data"
              columns={column}
              pagination
              expandableRows
              expandOnRowClicked
              expandableRowsComponent={ExpandableImages}
              customStyles={tableCustomStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductData;
