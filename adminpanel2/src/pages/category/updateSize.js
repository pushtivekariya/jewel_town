import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
import { getProdNameData, updateSizeData } from '../../api/common_api'
import Select from 'react-select';

import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation } from 'react-router-dom';
const UpdateSize = () => {
  const {state} = useLocation();
  useEffect(()=>{
    if (state != null) {
        setUpdatesize(state)
    }
  },[state]);
    const [updateSize,setUpdatesize] = useState([])
const onUpdatesizeChange =(e)=>{
    setUpdatesize({...updateSize,[e.target.name]:e.target.value})
}
    const updateSizeFunc = async ()=>{
        const response = await updateSizeData(updateSize)
        if (response.status == 1) {
            toast.success('size updated successfully......')
        }else{
          toast.error('update not ')
        }
        
    }
 
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
         // console.log(prodnameArr, "lllll");
       });
     };
     useEffect(() => {
       getProdNameFunc();
     }, []);
  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Update Product Size</h4>
            <p className="card-description">Update Size</p>
            <form className="forms-sample">
             
              <div className="form-group">
                <label htmlFor="exampleSelectGender">Product Name</label>

                <Select
                  value={getProdName?.map((list) => {
                    if (list.value == updateSize.product_name_id) {
                      return { value: list.lable, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    setUpdatesize({
                      ...updateSize,
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
                  onChange={(e) => onUpdatesizeChange(e)}
                  placeholder="enter size name"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={updateSize.size}

                />
                
              </div>

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => updateSizeFunc()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to='/sizeData'>

              <button
                type="button"
               
                className="btn btn-primary mr-2"
              >
                View Data
              </button>
              </Link>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateSize
