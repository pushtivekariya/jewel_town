import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProdNameData, insertCategory } from "../../api/common_api";
import Select from "react-select";
import { Link } from "react-router-dom";

const Category = () => {
  const [addcategory, setAddcategory] = useState({
    category_name: "",
    category_type: "",
  });
  console.log(addcategory, "aaaaaaaaaaa");
  // const [CategoryData, setCategoryData] = useState([]);

  const ChangeCat = (e) => {
    setAddcategory({ ...addcategory, [e.target.name]: e.target.value });
  };

  const submitCategory = async () => {
    if (addcategory.category_name === "") {
      toast.error("please enter category name");
    } else if (addcategory.category_type === "") {
      toast.error("please select category");
    } else {
      const result = await insertCategory(addcategory);
      if (result.status == 1) {
        toast.success("Category Added Successfully");
        setAddcategory({
          category_name: "",
          category_type: "",
        });
      }
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
            <h4 className="card-title">Add Catetory</h4>

            <form className="forms-sample">
            
              <div className="form-group">
                <label htmlFor="exampleSelectGender">category type</label>

                <Select
                  value={options?.map((list) => {
                    if (list.value == addcategory.category_type) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    console.log(e.value, "ppppppppppppppp");
                    setAddcategory({
                      ...addcategory,
                      category_type: e.value,
                    });
                  }}
                  options={options}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">category name</label>
                <input
                  name="category_name"
                  onChange={(e) => ChangeCat(e)}
                  placeholder="enter gender and jwellary type only"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={addcategory.category_name}
                />
              </div>
              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => submitCategory()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/get_category">
                <button type="button" className="btn btn-primary mr-2">
                  View Data
                </button>
              </Link>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
