import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getCategoryList, getProdNameData, getSizeData, updateSubcategory } from "../../api/common_api";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";

const UpdateSubCategory = () => {
  const { state } = useLocation();

  const [updatesubcat, setUpdatesubcat] = useState([]);
  // const onupdateChange = (e) => {
  //   setUpdatesubcat({ ...updatesubcat, [e.target.name]: e.target.value });
  // };
  console.log(updatesubcat, "aaaaaaaa");
  const submitUpSubCategory = async () => {
    const updatesubcate = await updateSubcategory(updatesubcat);
    if (updatesubcate.status == 1) {
      toast.success("subcategory updated successfully....");
    }
    console.log('called');
  };
  useEffect(() => {
    if (state != null) {
      setUpdatesubcat(state);
    }
  }, [state]);
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
  }
  useEffect(() => {
    getSizeFunc();
  }, []);


  return (
    <>
      <div className="col-md-6 grid-margin stretch-card container">
        <div className="card ">
          <div className="card-body">
            <h3 className="text-center">Update SubCatetory</h3>
            {/* <p className="card-description">Update SubCategory</p> */}
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Subcategory Name</label>
                {/* <input
                  type="text"
                  name="subcategory_name"
                  onChange={(e) => onupdateChange(e)}
                  placeholder="enter subcategory name"
                  className="form-control"
                  id="exampleInputUsername1"
                /> */}
                <Select
                  value={getProdName?.map((list) => {
                    if (list.value == updatesubcat.product_name_id) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setUpdatesubcat({
                      ...updatesubcat,
                      product_name_id: e.value,
                    });
                    // getProdNameFunc(e.value);
                    getSizeFunc(e.value)
                  }}
                  options={getProdName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender"> Gender</label>

                <Select
                  value={gender?.map((list) => {
                    if (list.value == updatesubcat.category_gender) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setUpdatesubcat({
                      ...updatesubcat,
                      category_gender: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={gender}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender"> Jwellary Type</label>
                <Select
                  value={type?.map((list) => {
                    if (list.value == updatesubcat.category_type) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setUpdatesubcat({
                      ...updatesubcat,
                      category_type: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectGender"> Jwellary Size</label>
                <Select
                  value={getsize?.map((list) => {
                    if (list.value == updatesubcat.size_id) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setUpdatesubcat({
                      ...updatesubcat,
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
                onClick={() => submitUpSubCategory()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to='/getSubCatData'>
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

export default UpdateSubCategory;
