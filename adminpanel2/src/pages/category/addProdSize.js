import React, { useEffect, useState } from "react";
import { addProdSize, getProdNameData } from "../../api/common_api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { Link } from "react-router-dom";
const AddProdSize = () => {
  const [sizedata, setsize] = useState({
    product_name_id: "",
    size: "",
  });
  const onSizeChange = (e) => {
    setsize({ ...sizedata, [e.target.name]: e.target.value });
  };

  // get produtc name in dropdown
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
      console.log(prodnameArr, "lllll");
    });
  };

  const submitSize = async () => {
    if (sizedata.product_name_id == "") {
      toast.error("please enter product name");
    } else if (sizedata.size == "") {
      toast.error("please enter size ");
    } else {
      const response = await addProdSize(sizedata);
      if (response.status == 1) {
        toast.success("size added successfully");
        setsize({
          product_name_id: "",
          size: "",
        });
      }
    }
  };
  useEffect(() => {
    getProdNameFunc();
  }, []);
  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add Product Size</h4>
            {/* <p className="card-description">Add Size</p> */}
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleSelectGender">Product Name</label>

                <Select
                  value={getProdName?.map((list) => {
                    if (list.value == sizedata.product_name_id) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setsize({
                      ...sizedata,
                      product_name_id: e.value,
                    });
                    getProdNameFunc(e.value);
                  }}
                  options={getProdName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Size Name</label>
                <input
                  name="size"
                  onChange={(e) => onSizeChange(e)}
                  placeholder="enter size name"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={sizedata.size}
                />
              </div>

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => submitSize()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/sizeData">
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

export default AddProdSize;
