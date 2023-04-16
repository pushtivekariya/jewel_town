import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategoryApi, getCategoryList } from "../../api/common_api";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
const CategoryData = () => {
  const navigate = useNavigate();
  const [catData, setCataData] = useState([]);
  const [deletecategory, setDeleteCategory] = useState([]);
  const getCategory = async () => {
    const CategoryInfo = await getCategoryList();
    setCataData(CategoryInfo.result);
  };
  useEffect(() => {
    getCategory();
  }, []);

  const deleteCatfunc = async (category_id) => {
    const response = await deleteCategoryApi(category_id);
    setDeleteCategory(response.result);
    if (response.status == 1) {
      toast.success("category deleted ");
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
    {
      name: "Category Id",
      selector: (row) => row.category_id,
      width: "7rem",
    },
    {
      name: "Category Name",
      selector: (row) => row.category_name,
      width: "10rem",
    },
    {
      name: "Category Type",
      selector: (row) => row.category_type,
      width: "10rem",
    },
    {
      name: "Category Type name",
      cell: (row) => {
        if (row.category_type == 0) {
          return <p>Gender</p>;
        } else if (row.category_type == 1) {
          return <p>Jwellary Type</p>;
        }
      },
      width: "10rem",
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
            navigate("/update_category", { state: row });
          }}
          style={{color:"#c39587",border:"none",background:"none"}}
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
            deleteCatfunc(row.category_id);
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
            style={{  fontSize: "30px" }}
          >
            CATEGORY INFORMATION

            <Link to='/category'>
                <button type="button" style={{marginLeft:"50px"}}  className="btn btn-primary mr-2">
                  Add Category
                </button>
              </Link>
          </h4>

          <div className="table-responsive">
            <DataTable
              data={catData}
              // title="Category List"
              columns={column}
              pagination
              customStyles={tableCustomStyles}
              
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CategoryData;
