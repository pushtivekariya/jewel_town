import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { addPurityApi, getCategoryList } from "../../api/common_api";

const AddPurity = () => {
  const [addPurity, setaddPurity] = useState([]);

  const [GetCategory, setGetCategory] = useState([]);
  const ChangePurity = (e) => {
    setaddPurity({ ...addPurity, [e.target.name]: e.target.value });
  };
console.log(addPurity,"addpurity");
  const addPurityFunc = async () => {
    if (addPurity.jwellary_type == null) {
      toast.error("please select Jewellary Type");
    } else if (addPurity.purity_name == null) {
      toast.error("Please Enter Jewellary Purity");
    } else {
      const response = await addPurityApi(addPurity);
      console.log(response.result, "ADDpurity response");
      if (response.status == 1) {
        toast.success("Purity Added Successfully")
        setaddPurity({purity_name:""})
      }else{
        toast.error("Promocode Already Exists")
      }
    }
  };
  const getCategoryFunc = async () => {
    const response = await getCategoryList();
  
    console.log(response.result, "category");
    const jewellaryTypeArr = [];
    response.result?.map((list) => {
      console.log(list, "list");
      if (list.category_type == 1) {
        jewellaryTypeArr.push({
          value: list.category_name,
          label: list.category_name,
        });
      }

      setGetCategory(jewellaryTypeArr);
    });
  };
  useEffect(() => {
    getCategoryFunc();
  }, []);
  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add Jewellary Purity</h4>

            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Jewellary Type</label>
                <Select
                  value={GetCategory?.map((list) => {
                    if (list.value == addPurity.jwellary_type) {
                      return { value: list.value, label: list.label  };
                    }
                  })}
                  onChange={(e) => {
                    console.log(e.value, "ppppppppppppppp");
                    setaddPurity({
                      ...addPurity,
                      jwellary_type: e.value,
                    });
                  }}
                  options={GetCategory}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender">Jewellary Purity</label>
                <input
                  name="purity_name"
                  onChange={(e) => ChangePurity(e)}
                  placeholder="enter Jewellary Purity"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={addPurity.purity_name}
                />
              </div>

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => addPurityFunc()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/PurityData">
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

export default AddPurity;
