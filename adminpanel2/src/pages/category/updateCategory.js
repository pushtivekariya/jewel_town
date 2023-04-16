import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateCategoryInfo } from "../../api/common_api";
import Select from "react-select";

const UpdateCategory = () => {
  const { state } = useLocation();
  console.log(state, "ppppppppppppp");
  const [updateCategory, setUpdateCategory] = useState([]);
  useEffect(() => {
    if (state != null) {
      setUpdateCategory(state);
    }
  }, [state]);
  console.log(updateCategory, "llllllllllll");
  const UpdateCat = (e) => {
    setUpdateCategory({ ...updateCategory, [e.target.name]: e.target.value });
  };
  const submitUpdateCategory = async () => {
    const UpdateCat = await updateCategoryInfo(updateCategory);
    if (UpdateCat.status == 1) {
      toast.success("category updated successfully......");
    }
  };
  const options = [
    { value: 0, label: "gender" },
    { value: 1, label: "jwellary type" },
  ];

  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Update Catetory</h4>
            <br />
            {/* <p className="card-description">Add Category</p> */}
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">category name</label>
                <input
                  name="category_name"
                  onChange={(e) => UpdateCat(e)}
                  placeholder="enter category name"
                  type="text"
                  className="form-control"
                  value={updateCategory?.category_name}
                  id="exampleInputUsername1"
                  //   placeholder="cat"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender">category type</label>
                {/* <select
                  name="category_type"
                  onChange={(e) => UpdateCat(e)}
                  className="form-control"
                  id="exampleSelectGender"
                  value={updateCategory?.category_type}

                >
                  <option>Select Category Type</option>
                  <option value="0">gender</option>
                  <option value="1">jwellary type</option>
                  <option value="2">size</option>
                </select> */}
                <Select
                  value={options?.map((list) => {
                    if (list.value == updateCategory.category_type) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setUpdateCategory({
                      ...updateCategory,
                      category_type: e.value,
                    });
                  }}
                  options={options}
                />
              </div>

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => submitUpdateCategory()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to='/get_category'>
                <button type="button" className="btn btn-primary mr-2">
                  View Data
                </button>
              </Link>
              <ToastContainer />
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
