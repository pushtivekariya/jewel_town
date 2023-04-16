import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { addpromocodes } from "../../api/common_api";
import $ from "jquery";

const Addpromocode = () => {
  const [addPromocode, setaddPromocode] = useState({
    promocode: "",
    promocode_type: "",
    promocode_discount_amount: "",
    start_date: "",
    end_date: "",
    no_of_use: "",
    minimum_order_amount: "",
  });
  const options = [
    { value: 0, label: "select..." },
    { value: 1, label: "Percentage" },
    { value: 2, label: "Flat Amount" },
  ];

  const onPromoChange = (e) => {
    setaddPromocode({ ...addPromocode, [e.target.name]: e.target.value });
  };
  const addpromofunc = async () => {
    const pattern = /^(100|[1-9][0-9]|[1-9])$/;
    const discountPercentage = addPromocode.promocode_discount_amount;

    if (addPromocode.promocode == "") {
      toast.error("Please Enter Promocode Name");
    } else if (addPromocode.promocode_type == "") {
      toast.error("Please Select Promocode Type ");
    } else if (addPromocode.promocode_type == "") {
      toast.error("Please Select Promocode Type ");
    } else if (addPromocode.promocode_discount_amount == "") {
      toast.error("Please Enter Promocode Discount Amount ");
    } else if (
      addPromocode.promocode_type == 1 &&
      pattern.test(discountPercentage) == false
    ) {
      toast.error("Please Enter Discount Percentage In 1 to 100");
    } else if (isNaN(addPromocode.promocode_discount_amount)) {
      toast.error("Please Enter Discount Amount In Number Only ");
    } else if (addPromocode.start_date == "") {
      toast.error("Please Select Offer's Start Date");
    } else if (addPromocode.end_date == "") {
      toast.error("Please Select Offer's End Date");
    } else if (addPromocode.no_of_use == "") {
      toast.error("Please Enter Number Of Uses");
    } else if (isNaN(addPromocode.no_of_use)) {
      toast.error("Please Enter Number Of Uses In Number Only");
    } else if (addPromocode.minimum_order_amount == "") {
      toast.error("Please Enter Minimum Order Amount");
    } else if (isNaN(addPromocode.minimum_order_amount)) {
      toast.error("Please Enter Minimum Order Amount In Number Only");
    } else {
      const response = await addpromocodes(addPromocode);

      if (response.status == 1) {
        toast.success("Promocode Added Successfully");
        setaddPromocode({
          promocode: "",
          promocode_type: "",
          promocode_discount_amount: "",
          start_date: "",
          end_date: "",
          no_of_use: "",
          minimum_order_amount: "",
        });
      } else {
        toast.error("promocode alredy exists");
       
      }
    }
  };

  const defaultValue = options[0];
  $(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var minDate = year + "-" + month + "-" + day;

    $("#txtDate").attr("min", minDate);
  });
  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            {/* <p className="card-description">Add Product Names</p> */}
            <h4 className="card-title ">Add Promocodes</h4>
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Promocodes name</label>
                <input
                  name="promocode"
                  onChange={(e) => onPromoChange(e)}
                  placeholder="Enter Promocode"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={addPromocode.promocode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Promocode Type</label>
                <Select
                  value={options?.map((list) => {
                    if (list.value == addPromocode.promocode_type) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setaddPromocode({
                      ...addPromocode,
                      promocode_type: e.value,
                    });
                  }}
                  options={options}
                  defaultValue={defaultValue}
                />
              </div>

              {addPromocode.promocode_type == 1 && (
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">
                    Discount Percntage
                  </label>
                  <input
                    name="promocode_discount_amount"
                    onChange={(e) => onPromoChange(e)}
                    placeholder="Enter Discount Amount"
                    type="text"
                    className="form-control"
                    id="exampleInputUsername1"
                  value={addPromocode.promocode_discount_amount}

                  />
                </div>
              )}

              {addPromocode.promocode_type == 2 && (
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Discount Amount</label>
                  <input
                    name="promocode_discount_amount"
                    onChange={(e) => onPromoChange(e)}
                    placeholder="Enter Discount Amount"
                    type="text"
                    className="form-control"
                    id="exampleInputUsername1"
                  value={addPromocode.promocode_discount_amount}

                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Start Date</label>
                <input
                  name="start_date"
                  onChange={(e) => onPromoChange(e)}
                  //   placeholder="Enter Promocode"
                  type="date"
                  className="form-control"
                  id="txtDate"
                  value={addPromocode.start_date}

                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">End Date</label>
                <input
                  name="end_date"
                  onChange={(e) => onPromoChange(e)}
                  placeholder="Enter Promocode"
                  type="date"
                  className="form-control"
                  id="exampleInputUsername1"
                  min={addPromocode.start_date}
                  value={addPromocode.end_date}

                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Number Of Uses</label>
                <input
                  name="no_of_use"
                  onChange={(e) => onPromoChange(e)}
                  placeholder="Number Of Uses"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={addPromocode.no_of_use}

                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">
                  Minimum Order Amount
                </label>
                <input
                  name="minimum_order_amount"
                  onChange={(e) => onPromoChange(e)}
                  placeholder="Minimum Order Amount"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={addPromocode.minimum_order_amount}

                />
              </div>

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => addpromofunc()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/promocodesdata">
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

export default Addpromocode;
