import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiBlock, BiCheckCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { activeUserApi, blockUserApi, getuserData } from "../../api/common_api";
import { Link } from "react-router-dom";

const UserRegistrationInfo = () => {
  const [userData, setUserData] = useState([]);
  const [blockUser, setBlockUser] = useState([]);
  const [activeuser, setActiveUser] = useState([]);
  const getUserList = async () => {
    const usersData = await getuserData();
    setUserData(usersData.result);
  };

  const blockuserfunc = async (user_id,email) => {
    const response = await blockUserApi(user_id,email);
    setBlockUser(response.result);
    if (response.status == 1) {
      toast.error("user Blocked");
    }
  };
  useEffect(() => {
    console.log("get user data effect called");
    getUserList();
  }, []);

  const activeuserFunc = async (user_id,email) => {
    const response = await activeUserApi(user_id,email);
    setActiveUser(response.result);
    if (response.status == 1) {
      toast.success("user Activated successfully");
    }
  };
  const column = [
    {
      name: "User Id",
      selector: (row) => row.user_id,
      width: "90px",
    },
    {
      name: "User Name",
      selector: (row) => row.user_name,
      width: "130px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "150px",
    },
    {
      name: "Contact Number",
      selector: (row) => row.contact_no,
      width: "150px",
    },
    {
      name: "Password",
      selector: (row) => row.password,
      width: "120px",
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      width: "120px",
    },
    {
      name: "date of birth",
      selector: (row) => row.date_of_birth,
      width: "120px",
    },
    {
      name: "Registration Date",
      selector: (row) => row.registration_at,
      width: "120px",
    },
    {
      name: "Modification Date",
      selector: (row) => row.modified_at,
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => {
        if (row.status == 0) {
          return <p>active</p>;
        } else {
          return <p>deactive</p>;
        }
      },
      width: "140px",
    },
    {
      name: "   Actions   ",
      cell: (row) => {
        if (row.status == 0) {
          return (
            <Link
              type="button"
              name="sub"
              value="update"
              // className="btn btn-primary "
              onClick={() => {
                blockuserfunc(row.user_id,row.email);
                window.location.reload();
              }}
              style={{ color: "#c39587" }}
            >
              <BiBlock size="30px" />
            </Link>
          );
        } else {
          return (
            <Link
              type="button"
              name="sub"
              value="update"
              // className="btn btn-primary "
              onClick={() => {
                activeuserFunc(row.user_id,row.email  );
                window.location.reload();
              }}
              style={{ color: "#c39587" }}
            >
              <BiCheckCircle size="30px" />
            </Link>
          );
        }
      },
    },
  ];

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        // paddingLeft: '0 8px',
        // justifyContent: 'center',
        backgroundColor: "#c39784",
      },
    },
  };
  return (
    <>
      {/* <div className="col-lg-6 grid-margin stretch-card"> */}
      <div className="card">
        <div className="card-body">
          <br />
          <h4
            className="card-title"
            style={{ marginLeft: "60px" , fontSize: "30px" }}
          >
            USER INFORMATION
          </h4>

          <div className="table-responsive">
            <DataTable
              data={userData}
              // title="Product Data"
              columns={column}
              pagination
              customStyles={tableCustomStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationInfo;
