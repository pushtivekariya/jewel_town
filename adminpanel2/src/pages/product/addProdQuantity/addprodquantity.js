import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addProdQuantiy, getproddataapi } from "../../../api/common_api";
import { APIRoutes } from "../../../constant/api_url";

const Addprodquantity = () => {
  const navigate = useNavigate();
  const [proddata, setproddataa] = useState([]);
  const { state } = useLocation();

  console.log(state, "state");
  useEffect(() => {
    if (state !== null) {
      setproddataa(state);
    }
  }, [state]);
  const arr1 = [];
  const arr2 = arr1.push(proddata);

  console.log(arr1, "arr1");

  const [addqty, setaddqty] = useState({
    added_quantity: "",
  });
  const addQtyChange = (e) => {
    setaddqty({ ...addqty, [e.target.name]: e.target.value });
  };

  const addQtyFunc = async () => {
    if (addqty.added_quantity == "") {
      toast.error("Please Enter Qunatity");
    } else if (isNaN(addqty.added_quantity)) {
      toast.error("only numbers are allowed");
    } else {
      const response = await addProdQuantiy({
        product_id: proddata.product_id,
        added_quantity: addqty.added_quantity,
      });
      setaddqty(response.result);
      if (response.status == 1) {
        toast.success("qunatity added successfully");
        setaddqty({
          added_quantity: "",
        });
      }
    }
  };

  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            {/* <p className="card-description">Add Product Names</p> */}
            <h3>Add Product Quantity</h3>
            <br />
            {arr1?.map((products) => {
              return (
                <>
                  <form
                    className="forms-sample"
                    style={{
                      border: "black solid",
                      padding: "20px 20px 10px 20px",
                      width: "500px",
                    }}
                  >
                    <div className="form-group">
                      {/* <label htmlFor="exampleInputUsername1">
                        products name id : */}
                      <div>
                        <h2 style={{ color: "#c39587" }}>
                          {`${products.product_id}`}{" "}
                          <span
                            style={{
                              marginLeft: "70px",
                              color: "black",
                              fontSize: "30px",
                            }}
                            className="text-center"
                          >
                            Product Information
                          </span>
                        </h2>
                      </div>
                      <br />
                      {/* </label> */}
                      <img
                        style={{ height: "200px", marginLeft: "20px" }}
                        className="product--image"
                        src={`${APIRoutes.APIHOSTNAME}images/${products.image_url}`}
                        alt="product-images"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputUsername1">
                        Add Products Quantity
                      </label>

                      <input
                        name="added_quantity"
                        onChange={(e) => addQtyChange(e)}
                        placeholder="enter product quantity"
                        type="text"
                        className="form-control"
                        id="exampleInputUsername1"
                        value={addqty.added_quantity}
                      />
                    </div>

                    <button
                      type="button"
                      name="sub"
                      value="update"
                      onClick={() => addQtyFunc()}
                      className="btn btn-primary mr-2"
                    >
                      Add Quantity
                    </button>

                    <button
                      type="button"
                      name="sub"
                      value="update"
                      onClick={() => navigate("/home")}
                      className="btn btn-primary mr-2"
                    >
                      Back To Home
                    </button>

                    {/* <Link to="/home">
                      <button type="button" className="btn btn-primary mr-2">
                        View Data
                      </button>
                    </Link> */}

                    <ToastContainer />
                  </form>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Addprodquantity;
