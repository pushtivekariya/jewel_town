import React from "react";
import Sidebar from "./sidebar";
import "./Profile.css"
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../../constant/api_url";
const Profile = () => {
  const login = JSON.parse(localStorage.getItem('login_info'));
const navigate = useNavigate()
  return (
    <>
      <div className="row main_row" >
        <div className="col-3 navigation">
          <Sidebar />
        </div>
        <div className="col-8 content" style={{paddingTop:"1px"}}>
     
          {login?.map((profileInfo)=>{
      console.log(profileInfo,'logininfo');
        return(
            <>
        
  <div className="container mb-4 d-flex justify-content-center" >
  
  <div className="cards p-4">
    
    <div className=" image d-flex flex-column justify-content-center align-items-center">
      
      {/* <button className="btns btns-secondary">   */}

      {
        profileInfo.profile_photo == null ? (
          <img src="images/icons/profile.jpg" height={170} width={330} style={{borderRadius:"50%",width:'9rem'}} alt="no admin"/>
        ) : (
          <img src={`${apiRoutes.APIHOSTNAME}user_profile_image/${profileInfo?.profile_photo}`} height={170} width={330} style={{borderRadius:"50%",width:'9rem'}} alt="no admin"/>

        )
      }
      {/* </button> */}
      <span className="name mt-3">{profileInfo.user_name}</span> 
      <span className="idd">{profileInfo.email}</span>
      <div className="d-flex flex-row justify-content-center align-items-center gap-2">
        
        <span className="idd1" >Contact Number : {profileInfo.contact_no}</span>
        {/* <span>
          <i className="fa fa-copy" />
        </span> */}
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center mt-3">
        
        <span className="number">
        Gender:{profileInfo.gender}
        </span>
      </div>
      <div className=" d-flex mt-2">
     

        <button className="btn1 btns-dark" onClick={() => {
            navigate("/updateprofileform", { state: profileInfo });
          }}>Edit Profile</button>
       
      </div>
      <div className="text mt-3">
        
        <span>Registred At : 
        {" "+profileInfo.registration_at}
        </span>
      </div>
    </div>
  </div>
</div>
    </>
        )
    })}
</div>


          {/* </main> */}
        </div>
      {/* </div> */}
    </>
  );
};

export default Profile;
