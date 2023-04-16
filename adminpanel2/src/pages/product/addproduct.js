import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Select from "react-select/dist/declarations/src/Select";
import { toast } from "react-toastify";
import Select from "react-select";

import {
  addProducts,
  getCategoryList,
  getProdNameData,
  getPurityApi,
  livePriceApi,
} from "../../api/common_api";

const Addproduct = () => {
  const [prodData, setProdData] = useState({
    product_name_id: "",
    short_description: "",
    gender: "",
    jwellary_type: "",
    jewellary_purity: "",
    weight: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState({
    image_url: "",
  });

  // get image path for display selected images

  // const imageRef = React.useRef(null);
  // function useDisplayImage() {
  //   const [result, setResult] = React.useState("");

  //   function uploader(e) {
  //     const imageFile = e.target.files[0];

  //     const reader = new FileReader();
  //     reader.addEventListener("load", (e) => {
  //       setResult(e.target.result);
  //     });

  //     reader.readAsDataURL(imageFile);
  //   }

  //   return { result, uploader };
  // }

  // const { result, uploader } = useDisplayImage();

  const onproductChange = (e) => {
    setProdData({ ...prodData, [e.target.name]: e.target.value });
    console.log(prodData);
  };

  console.log(prodData, "lllllllllllll");

  const onProductSubmit = async () => {
    if (prodData.product_name_id == "") {
      toast.error("please select product name");
    } else if (prodData.short_description == "") {
      toast.error("please enter Short Description");
    } else if (prodData.gender == "") {
      toast.error("please select gender");
    } else if (prodData.jwellary_type == "") {
      toast.error("please select jwellary type");
    } else if (prodData.jewellary_purity == "") {
      toast.error("please select jwellary Purity");
    } else if (prodData.weight == "") {
      toast.error("Please Enter Weight");
    } else if (prodData.price == "") {
      toast.error("please enter prise");
    } else if (isNaN(prodData.price)) {
      toast.error("please enter prise in digit only");
    } else if (prodData.quantity == "") {
      toast.error("please enter quantity");
    } else if (isNaN(prodData.quantity)) {
      toast.error("please enter quantity in digit only");
    } else if (prodData.description == "") {
      toast.error("please enter description");
    } else if (imageFile.image_url == "") {
      toast.error("Please Select Image File");
    } else {
      console.log(prodData, "product data");

      const formData = new FormData();
      for (let keys of Object.keys(imageFile.image_url)) {
        formData.append("product_image", imageFile.image_url[keys]);
      }

      Object.keys(prodData)?.map((key) => {
        formData.append(key, prodData[key]);
      });
      console.log(formData, "hhhhhhhhh");
      const result = await addProducts(formData);

      if (result.status == 1) {
        toast.success("product added successfully");
        let reloaded = false;

        setTimeout(() => {
          if (!reloaded) {
            window.location.reload();
            reloaded = true;
          }
        }, 5000);

        setImageFile({image_url:""})
        setProdData({
          product_name_id: "",
          short_description: "",
          gender: "",
          jwellary_type: "",
          jewellary_purity: "",
          weight: "",
          price: "",
          quantity: "",
          description: "",
        });
      }
      console.log(imageFile, "data");
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

  // const [liveprice , setLiveprice] = useState([]);
  // const livePriceFunc =async ()=>{
  // const response = await livePriceApi()
  // setLiveprice(response.result)
  // console.log(liveprice,"live price");
  // }

  useEffect(() => {
    console.log("use effect called");
    getCategoryData();
    // livePriceFunc()
    getPurityData();
  }, []);

  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add products</h4>
            {/* <p className="card-description">Add products</p> */}
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">product name</label>

                <Select
                  value={getProdName?.map((list) => {
                    if (list.value == prodData.product_name_id) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProdData({
                      ...prodData,
                      product_name_id: e.value,
                    });
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
                  value={prodData.short_description}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleSelectGender"> gender</label>

                <Select
                  value={gender?.map((list) => {
                    if (list.value == prodData.gender) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProdData({
                      ...prodData,
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
                    if (list.value == prodData.jwellary_type) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProdData({
                      ...prodData,
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
                    if (list.value == prodData.jewellary_purity) {
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProdData({
                      ...prodData,
                      jewellary_purity: e.value,
                    });
                  }}
                  options={purity}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="exampleSelectGender">product size </label>

                <Select
                  value={getsize?.map((list) => {
                    if (list.value == prodData.size_id) {
                      console.log(getsize, "listvalue");
                      return { value: list.value, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setProdData({
                      ...prodData,
                      size_id: e.value,
                    });
                    getCategoryData(e.value);
                  }}
                  options={getsize}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">product Weight</label>
                <input
                  type="text"
                  name="weight"
                  onChange={(e) => onproductChange(e)}
                  placeholder="Enter Product Weight"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={prodData.weight}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">product price</label>
                <input
                  type="text"
                  name="price"
                  onChange={(e) => onproductChange(e)}
                  placeholder="enter product price"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={prodData.price}
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
                  value={prodData.quantity}
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
                  value={prodData.description}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputUsername1">add images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setImageFile({
                      ...imageFile,
                      image_url: e.target.files,
                    });
                    //  uploader(e)
                  }}
                  placeholder="enter product discription"
                  className="form-control"
                  id="exampleInputUsername1"
                />
              </div>
              {/* </div> */}
              {/* <div className="form-group">
              
                {result && <img ref={imageRef} src={result} alt="" />}
              </div> */}

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => onProductSubmit()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/productdata">
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

export default Addproduct;
