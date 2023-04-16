import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { urserReviewData } from "../../api/common_api";
import { useEffect } from "react";
const UserReview = () => {
  const [userReviewData, setuserReviewData] = useState([]);
  const userReviewDataFunc = async () => {
    const response = await urserReviewData();
    setuserReviewData(response.result);
    console.log(response.result, "result");
  };
  const columns = [
    {
      name: "Review Id",
      selector: (row) => row.review_id,
      width:"100px"
    },
    {
        name: "User Id",
        selector: (row) => row.user_id,
   width:"100px"     
      },
    {
        name: "User Name",
        selector: (row) => row.user_name,
        width:"120px"
      },
      {
        name: "Email",
        selector: (row) => row.email,
        width:"180px"
      },
      {
        name: "Product Name",
        selector: (row) => row.product_name,
        width:"180px"
      },
      {
        name: "Ratings",
        selector: (row) => row.rating,
        width:"90px"
      },
      {
        name: "Review Title",
        selector: (row) => row.review_title,
        width:"120px"
      },
      {
        name: "Review Description",
        selector: (row) => row.review,
        width:"300px"
      },
  ];

  useEffect(() => {
    userReviewDataFunc();
  }, []);
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
      <div className="card">
        <div className="card-body">
          <br />
          <h4
            className="card-title"
            style={{ marginLeft: "60px", fontSize: "30px" }}
          >
            USER REVIEWS
          </h4>

          <div className="table-responsive">
            <DataTable
              data={userReviewData}
              columns={columns}
              pagination
              customStyles={tableCustomStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReview;
