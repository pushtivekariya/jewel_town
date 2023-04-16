import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profiledata } from "../api/common_api";
import { APIRoutes } from "../constant/api_url";
import "./ProfileData.css";


const ProfileData = () => {



  const Login_info = JSON.parse(localStorage.getItem("Login_info"));

  const navigate = useNavigate();
  const [profile, setprofile] = useState([]);
  // console.log(profile,"profileeee");
  const profiledatafunc = async () => {
    const response = await profiledata(Login_info[0].id);
    console.log(response,"rrr");
    setprofile(response.result);
  };
  useState(() => {
    profiledatafunc();
  }, []);

  

  
  return (
    <>
      {profile?.map((profileInfo) => {
        return (
          <>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
              <div className="cards p-4">
                <div className=" image d-flex flex-column justify-content-center align-items-center">
                  {/* <button className="btns btns-secondary"> */}

                  <img
                    src={`${APIRoutes.APIHOSTNAME}logoimages/${profileInfo.admin_image}`}
                    height={100}
                    width={100}
                    style={{ borderRadius: "80px" }}
                    alt="no admin"
                  />
                  {/* </button> */}
                  <span className="name mt-3">{profileInfo.admin_name}</span>
                  <span className="idd">{profileInfo.email}</span>
                  <br />
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span className="idd1">{profileInfo.contact_no}</span>
                    <span>
                      <i className="fa fa-copy" />
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                    <span className="number">{profileInfo?.gender}</span>
                  </div>
                  <div className=" d-flex mt-2">
                    <button
                      className="btn1 btns-dark"
                      onClick={() => {
                        navigate("/updateProfile", { state: profileInfo });
                      }}
                    >
                      Edit Profile
                    </button>
                  </div>
                  <div className="text mt-3">
                    <span>
                      Registred At :{" " + profileInfo.registration_at}
                      <br />
                      <br /> {profileInfo.admin_bio}
                    </span>
                  </div>
                  <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                    <span>
                      <i className="fa fa-twitter" />
                    </span>
                    <span>
                      <i className="fa fa-facebook-f" />
                    </span>
                    <span>
                      <i className="fa fa-instagram" />
                    </span>
                    <span>
                      <i className="fa fa-linkedin" />
                    </span>
                  </div>
                  <div className=" px-2 rounded mt-4 date ">
                    <span className="join">Joined jan,2023</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ProfileData;
