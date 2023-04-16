import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './updateuserProfile.css';
import Select from 'react-select';
import { useEffect } from 'react';
import { updateprofile } from '../../api/common_api';
import { toast } from 'react-toastify';
import Footer from '../../component/footer/footer';
import Header from '../../component/header/header';
import Script from '../../scripts';


function UserProfileForm() {

  const mailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const mobile = /^[0-9]{10}$/;
  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem('login_info'));


  const options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  
  ];
  // const [selectedOption, setSelectedOption] = useState(null);
  const [updateProfile,setUpdateProfile] = useState([]);

  const { state } = useLocation();
console.log(state,'statee');
useEffect(() => {
  if(state != null) {
    setUpdateProfile(state);
  }
},[state]);

console.log(state,'state');
console.log(updateProfile,'updateprofilte');

   const onUpdateProfile = (e) => {
    setUpdateProfile({...updateProfile,[e.target.name]: e.target.value});
   }
const updateProfilearray = [];
updateProfilearray.push(updateProfile)
console.log(updateProfilearray,'array');

const profileSubmit = async () => {
if (updateProfile?.user_name == "") {
toast.error("Username is required")  
}
else if (updateProfile?.email == ""){
  toast.error("email is required")  
} else if (mailValidation.test(updateProfile?.email) === false)
{
toast.error("please enter valid email")
} 
else if(updateProfile?.gender == "")
{
  toast.error("please select gender");
}
else if(updateProfile.contact_no == "")
{
  toast.error("contact no is required")  

}
else if(mobile.test(updateProfile?.contact_no) === false)
{
  toast.error("enter only 10 digit mobile number");
}
else {
  const formdata = new FormData();
  for (let keys of Object.keys(updateProfile.profile_photo)) {
    formdata.append("profile_photo",updateProfile.profile_photo[keys])
  }

  Object.keys(updateProfile)?.map((key)=> {
    formdata.append(key,updateProfile[key]);
  })
  console.log(formdata,'formdata');
const response = await updateprofile(formdata);
console.log(response,'response');
if(response.status == 1)
{
  localStorage.setItem('login_info',JSON.stringify(response.result))
  toast.success("your profile updated successfully")
  navigate('/account') 
}
}
}
  return (
  <>  
  
  {/* <Header/> */}
  
    
      {login.map((userinfo) => {
        console.log(userinfo,'UUUUUUUUU');
        return (
          <>
            <form className="user-profile-form">
              <h2 className="form-title">Update Profile</h2>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  className="form-input"
                  value={updateProfile?.user_name}
                  onChange = {(e) => onUpdateProfile(e)}
               
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                value={updateProfile?.email}
                onChange = {(e) => onUpdateProfile(e)}
           
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mobile No:
                </label>
                <input
                  type="text"
                  name="contact_no"
                  maxLength={10}
                  minLength={10}
                  id="contact_no"
                  className="form-input"
                value={updateProfile?.contact_no}
                onChange = {(e) => onUpdateProfile(e)}
              
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                 Profile Image:
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-input"
                onChange = {(e) => {
                setUpdateProfile({
                  ...updateProfile,profile_photo:e.target.files
                });
                }}
              
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Date Of Birth:
                </label>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  className="form-input"
                value={userinfo[0].birthdate}
                // onChange={handleChange}
                />
              </div> */}
              {/* other form fields */}
              <div className='btnsub'>
                <button type="button" className="form-btn" onClick={()=> {
                  profileSubmit()
                }}>
                  Update Details
                
                </button>
                <Link to='/account'>
                  <button type="submit" className="form-btn">
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </>
        )
      })}

 
    {/* <Footer/> */}
   
    </>

  )
}

export default UserProfileForm