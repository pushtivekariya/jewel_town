import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { updateadminProfileapi } from "../api/common_api";

const UpdateProfile = () => {
  const Login_info = JSON.parse(localStorage.getItem("Login_info"));

  const [updateAdmin, setupdateAdmin] = useState([]);
  const { state } = useLocation();
  console.log(state, "state");
  useEffect(() => {
    if (state != null) {
      setupdateAdmin(state);
    }
  }, [state]);
  console.log(state, "state");
  console.log(updateAdmin, "oooooooooo");
  const onUpdateProfile = (e) => {
    setupdateAdmin({ ...updateAdmin, [e.target.name]: e.target.value });
  };

  const options = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
  ];

  const updateSubmitProfile = async () => {
    if (updateAdmin.date_of_birth == "") {
      toast.error("please enter date of birth");
    }
    else if(updateAdmin.admin_image == ""){
toast.error("please upload admin profile image")
    } else {

const formData = new FormData();
console.log(formData,"formData");
for (let keys of Object.keys(updateAdmin.admin_image)) {
  formData.append("admin_image", updateAdmin.admin_image[keys]);
}
// for (let keys of Object.keys(imageFile.image_url)) {
//   formData.append("product_image", imageFile.image_url[keys]);
// }

Object.keys(updateAdmin)?.map((key) => {
  formData.append(key, updateAdmin[key]);
});
console.log(formData,"ffff");

      const response = await updateadminProfileapi(formData);
console.log(response.result,"resultt");

      if (response.status == 1) {
        localStorage.setItem('Login_info', JSON.stringify(response.result))
console.log(response,"rrr");
        toast.success("profile updated successfully");
      }
    }
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Update Profile</h4>
            <br />
            {/* <p className="card-description">Add Category</p> */}
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Admin name</label>
                <input
                  name="admin_name"
                  onChange={(e) => onUpdateProfile(e)}
                  placeholder="enter name"
                  type="text"
                  className="form-control"
                  value={updateAdmin?.admin_name}
                  id="exampleInputUsername1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Email Id</label>
                <input
                  name="email"
                  onChange={(e) => onUpdateProfile(e)}
                  placeholder="Enter Email Id"
                  type="text"
                  className="form-control"
                  value={updateAdmin.email}
                  id="exampleInputUsername1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1"> Date Of Birth</label>
                <input
                  name="date_of_birth"
                  onChange={(e) => onUpdateProfile(e)}
                  placeholder="Enter date_of_birth "
                  type="date"
                  className="form-control"
                  value={updateAdmin.date_of_birth}
                  id="exampleInputUsername1"
                  max={today}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1"> Contact Number</label>
                <input
                  name="contact_no"
                  onChange={(e) => onUpdateProfile(e)}
                  placeholder="Enter contact number "
                  type="text"
                  className="form-control"
                  value={updateAdmin.contact_no}
                  id="exampleInputUsername1"
                  maxLength={10}
                  minLength={10}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleSelectGender"> gender</label>

                <Select
                  value={options?.map((list) => {
                    if (list.value == updateAdmin.gender) {
                      return { value: list.label, label: list.label };
                    }
                  })}
                  onChange={(e) => {
                    console.log(e.value, "ppppppppppppppp");
                    setupdateAdmin({
                      ...updateAdmin,
                      gender: e.value,
                    });
                  }}
                  options={options}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Admin Bio</label>
                <input
                  name="admin_bio"
                  onChange={(e) => onUpdateProfile(e)}
                  placeholder="Enter Admin Bio"
                  type="text"
                  className="form-control"
                  value={updateAdmin?.admin_bio}
                  id="exampleInputUsername1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">
                  Admin Profile Image
                </label>
                <input
                  // name="admin_image"
                  onChange={(e) => {
                    setupdateAdmin({
                      ...updateAdmin,
                      admin_image: e.target.files,
                    });
                  }}
                  type="file"
                  className="form-control"
                  id="exampleInputUsername1"
                />
              </div>

              <button
                type="button"
                name="sub"
                value="submit"
                onClick={() => updateSubmitProfile()}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <Link to="/profileData">
                <button type="button" className="btn btn-primary mr-2">
                  View Profile
                </button>
              </Link>
            </form>
         
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
