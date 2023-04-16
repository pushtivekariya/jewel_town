import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import Select from 'react-select/dist/declarations/src/Select';
import { toast, ToastContainer } from "react-toastify";
import {
  getCategoryList,
  getProdNameData,
  getPurityApi,
  updateProductApi,
} from "../../api/common_api";
import Select from "react-select";

const UpdateProduct = () => {
  const { state } = useLocation();
  console.log(state, "lllllaaaa");
  const [productUpdate, setProductUpdate] = useState([]);
  const [imageFile, setImageFile] = useState([]);

  const onproductChange = (e) => {
    setProductUpdate({ ...productUpdate, [e.target.name]: e.target.value });
  };

  console.log(productUpdate, "lllllllllllll");

  const onProductUpdateSubmit = async () => {
    console.log(productUpdate, "product data");

    // const formData = new FormData();
    // for (let keys of Object.keys(imageFile.image_url)) {
    //   formData.append("product_image", imageFile.image_url[keys]);
    // }

    // Object.keys(productUpdate)?.map((key) => {
    //   console.log(key, "kkkkkkkk");
    //   formData.append(key, productUpdate[key]);
    // });
    // console.log(formData, "hhhhhhhhh");
    const result = await updateProductApi(productUpdate);

    if (result.status == 1) {
      toast.success("product added successfully");
    }
    console.log(imageFile, "data");
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
    });
  };
  useEffect(() => {
    getProdNameFunc();
  }, []);

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

  const [purity, setPurity] = useState([]);
  const getPurityData = async () => {
    const response = await getPurityApi();
    const purityArr = [];
    response.result?.map((list) => {
      purityArr.push({
        value: list.purity_name,
        label: list.purity_name,
      });
      setPurity(purityArr);
    });
  };

  useEffect(() => {
    getPurityData()
    console.log("use effect called");
    getCategoryData();
  }, []);
  useEffect(() => {
    if (state != null) {
      setProductUpdate(state);
    }
  }, [state]);
  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Update Products</h4>
            <p className="card-description">Update Products</p>
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">product name</label>

                <Select
                  value={getProdName?.map((list) => {
                    if (list.value == productUpdate.product_name_id) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProductUpdate({
                      ...productUpdate,
                      product_name_id: e.value,
                    });
                    console.log(e.value, "value");
                    getProdNameFunc(e.value);

                    // console.log(getsize, "sizess");
                    // getSizeFunc(e.value);
                    // };
                  }}
                  options={getProdName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Short Description</label>
                <input
                  type="text"
                  name="short_description"
                  onChange={(e) => onproductChange(e)}
                  placeholder="enter quantity of product"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={productUpdate.short_description}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleSelectGender"> gender</label>

                <Select
                  value={gender?.map((list) => {
                    if (list.value == productUpdate.gender) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProductUpdate({
                      ...productUpdate,
                      gender: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={gender}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender">jwellary type</label>

                <Select
                  value={type?.map((list) => {
                    if (list.value == productUpdate.jwellary_type) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProductUpdate({
                      ...productUpdate,
                      jwellary_type: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Jewellary Purity</label>

                <Select
                  value={purity?.map((list) => {
                    if (list.value == productUpdate.jewellary_purity) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProductUpdate({
                      ...productUpdate,
                      jewellary_purity: e.value,
                    });
                  }}
                  options={purity}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputUsername1">product Weight</label>
                <input
                  type="text"
                  name="weight"
                  onChange={(e) => onproductChange(e)}
                  placeholder="Enter Product Weight"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={productUpdate.weight}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="exampleSelectGender">product size </label>

                <Select
                  value={getsize?.map((list) => {
                    if (list.value == productUpdate.size_id) {
                      console.log(getsize, "listvalue");
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProductUpdate({
                      ...productUpdate,
                      size_id: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={getsize}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">product price</label>
                <input
                  type="text"
                  name="price"
                  onChange={(e) => onproductChange(e)}
                  placeholder="enter product price"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={productUpdate.price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputUsername1">product quantity</label>
                <input
                  type="text"
                  name="quantity"
                  onChange={(e) => onproductChange(e)}
                  placeholder="enter quantity of product"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={productUpdate.quantity}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputUsername1">
                  product discription
                </label>
                <input
                  type="text"
                  name="description"
                  multiple
                  onChange={(e) => onproductChange(e)}
                  placeholder="enter product discription"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={productUpdate.description}
                />
              </div>

              {/* <div className="form-group">
                <label htmlFor="exampleInputUsername1">add images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setImageFile({
                      ...imageFile,
                      image_url: e.target.files,
                    });
                  }}
                  placeholder="enter product discription"
                  className="form-control"
                  id="exampleInputUsername1"
                  
                />
              </div> */}
              {/* </div> */}

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => onProductUpdateSubmit()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/productdata">
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

export default UpdateProduct;
