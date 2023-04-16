import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addProductName } from "../../api/common_api";

const ProductName = () => {
  const [productName, setProductName] = useState({
    product_names:''
  });
  console.log(productName);
  const ChangeProductName = (e) => {
    setProductName({ ...productName, [e.target.name]: e.target.value });
  };
  const ProductNameSubmit = async () => {
    if (productName.product_names == "") {
      toast.error("please enter product name");
    } else {
      const result = await addProductName(productName);
      if (result.status == 1) {
        toast.success("product name added");
        setProductName({product_names:""})
      }
    }
  };
  return (
    <>
    
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            {/* <p className="card-description">Add Product Names</p> */}
            <h4 className="card-title ">Add Product Names</h4>
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">products name</label>
                <input
                  name="product_names"
                  onChange={(e) => ChangeProductName(e)}
                  placeholder="enter category name"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={productName.product_names}
                />
              </div>

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => ProductNameSubmit()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/product_nameData">
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

export default ProductName;
