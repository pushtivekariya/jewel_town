import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { deleteSubCatApi, getSubCategory } from "../../api/common_api";

const SubCategoryData = () => {
  const navigate = useNavigate();
  const [subCatData, setSubCatData] = useState([]);
  const [deleteSubCategory,setDeleteSubcategory] = useState ([]);
  const getSubCatList = async () => {
    const getSubCatData = await getSubCategory();
    setSubCatData(getSubCatData.result);
  };

  const deleteSubCatfunc = async(subcategory_id)=>{
    const response =await deleteSubCatApi(subcategory_id);
    setDeleteSubcategory(response.result)
    if (response.status == 1) {
      toast.success('Subcategory Deleted ')
    }
    let reloaded = false;

    setTimeout(() => {
      if (!reloaded) {
        window.location.reload();
        reloaded = true;
      }
    }, 5000);
  }
  useEffect(() => {
    getSubCatList();
  }, []);

  const column = [
    {
      name: "Category Id",
      selector: (row) => row.subcategory_id,
    },
    {
      name: "Category Name",
      selector: (row) => row.product_names,
      width:"135px"
    },
    {
      name: "Category Gender",
      selector: (row) => row.category_gender,
      width:"150px"
    },
    {
      name: "Category Type",
      selector: (row) => row.category_type,
      width:"130px"
    },
    {
      name: " Size Id",
      selector: (row) => row.size_name,
      width:"95px"
    },
    {
      name: "   Update   ",
      cell: (row) => (
        <button
          type="button"
          name="sub"
          value="update"
          // className="btn btn-primary "
          onClick={() => {
            navigate("/updateSubCat", { state: row });
          }}
          style={{color:"#c39587",border:"none",background:'none'}}
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
          // className="btn btn-primary "
          onClick={() => {
            deleteSubCatfunc(row.subcategory_id)
          }}
          style={{color:"#c39587"}}

        >
          <FiDelete  size="30px"/>
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
        // justifyContent: 'center',
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
              style={{   fontSize: "30px" }}
            >
              SUBCATEGORY INFORMATION
              <Link to="/subcategory">
                <button type="button" style={{marginLeft:"50px"}} className="btn btn-primary mr-2">
                  Add SubCategory
                </button>
              </Link>
            </h4>

            <div className="table-responsive">
             
              <DataTable
                data={subCatData}
                // title="SubCategory Data"
                columns={column}
                pagination
                customStyles={tableCustomStyles}
              />
            </div>
          </div>
        <ToastContainer/>
        </div>
      
    </>
  );
};

export default SubCategoryData;
