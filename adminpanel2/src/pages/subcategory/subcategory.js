import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import {
  getCategoryList,
  getProdNameData,
  getSizeData,
  insertsubCategory,
} from "../../api/common_api";
import { Link } from "react-router-dom";

const Subcategory = () => {
  const [addsubcategory, setAddsubcategory] = useState({
    product_name_id: "",
    category_gender: "",
    category_type: "",
    category_size: "",
  });

  // const ChangesubCat = (e) => {
  //   setAddsubcategory({ ...addsubcategory, [e.target.name]: e.target.value });
  // };
  // console.log(addsubcategory, "uuu");
  const [gender, setgender] = useState([]);
  const [type, settype] = useState([]);

  const getCategoryData = async () => {
    const response = await getCategoryList();

    let cat_gender = [];

    response.result?.map((list) => {
      if (list.category_type == 0) {
        cat_gender.push({
          value: list.category_name,
          label: list.category_name,
        });
      }
    });

    setgender(cat_gender);

    let cat_type = [];

    response.result?.map((list) => {
      if (list.category_type == 1) {
        cat_type.push({ value: list.category_name, label: list.category_name });
      }
    });

    settype(cat_type);
  };

  useEffect(() => {
    console.log("use effect called");
    getCategoryData();
  }, []);

  const submitSubCategory = async (e) => {
    if (addsubcategory.product_name_id == "") {
      toast.error("please enter subcategory name");
    } else if (addsubcategory.category_gender == "") {
      toast.error("please select gender");
    } else if (addsubcategory.category_type == "") {
      toast.error("please select jwellary type");
    } else {
      const result = await insertsubCategory(addsubcategory);
      if (result.status == 1) {
        toast.success("subcategory added successfully");
        setAddsubcategory({
          product_name_id: "",
          category_gender: "",
          category_type: "",
          category_size: "",
        });
      }
    }
  };

  const [getProdName, setProdName] = useState([]);
  const getProdNameFunc = async () => {
    const response = await getProdNameData();

    const prodnameArr = [];
    response.result?.map((list) => {
      prodnameArr.push({
        value: list.product_name_id,
        label: list.product_names,
      });
      setProdName(prodnameArr);
      // console.log(prodnameArr, "lllll");
    });
  };
  useEffect(() => {
    getProdNameFunc();
  }, []);

  const [getsize, setgetsize] = useState([]);
  const getSizeFunc = async (product_name_id) => {
    const response = await getSizeData(product_name_id);

    let sizeArr = [];

    response.result?.map((list) => {
      console.log(list.product_name_id, "list");

      sizeArr.push({
        value: list.size_id,
        label: list.size,
      });

      setgetsize(sizeArr);
    });
  };
  // console.log(sizeArr, "size");
  // // const getSizeFunc = async () => {
  // //   const response = await getSizeData();

  // //   let sizeArr = [];
  // //   console.log(getProdName, "prodname");

  // //   response.result?.map((list) => {
  // //     sizeArr.push({
  // //       value: list.size,
  // //       label: list.size,
  // //     });
  // //   });
  // //   setgetsize(sizeArr);
  // // };
  // // useEffect(() => {
  // //   getSizeFunc();
  // // }, []);

  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Sub Catetory</h4>
            {/* <p className="card-description">Add SubCategory</p> */}
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Subcategory name</label>
                {/* <input
                  type="text"
                  name="product_name_id"
                  onChange={(e) => ChangesubCat(e)}
                  placeholder="enter subcategory name"
                  className="form-control"
                  id="exampleInputUsername1"
                /> */}
                <Select
                  value={getProdName?.map((list) => {
                    if (list.value == addsubcategory.product_name_id) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setAddsubcategory({
                      ...addsubcategory,
                      product_name_id: e.value,
                    });
                    getSizeFunc(e.value);
                  }}
                  options={getProdName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender"> gender</label>

                <Select
                  value={gender?.map((list) => {
                    if (list.value == addsubcategory.category_gender) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setAddsubcategory({
                      ...addsubcategory,
                      category_gender: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={gender}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender"> jwellary type</label>

                <Select
                  value={type?.map((list) => {
                    if (list.value == addsubcategory.category_type) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setAddsubcategory({
                      ...addsubcategory,
                      category_type: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender"> jwellary size</label>

                <Select
                  value={getsize?.map((list) => {
                    if (list.value == addsubcategory.size_id) {
                      console.log(getsize, "listvalue");
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setAddsubcategory({
                      ...addsubcategory,
                      size_id: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={getsize}
                />
              </div>

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => submitSubCategory()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/getSubCatData">
                <button type="button" className="btn btn-primary mr-2">
                  View Data
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subcategory;
