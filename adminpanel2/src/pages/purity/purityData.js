import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {  toast } from "react-toastify";
import { deletePurity, getPurityApi } from "../../api/common_api";
import { useEffect } from "react";
import { FiDelete } from "react-icons/fi";

const PurityData = () => {
  const [puritydata, setpuritydata] = useState([]);
  const [deletePuritydata, setDeletePuritydata] = useState([]);
  const getPurityFunc = async () => {
    const response = await getPurityApi();
    setpuritydata(response.result);
  };

  const deletePurityFunc = async (purity_id) => {
    const response = await deletePurity(purity_id);
    setDeletePuritydata(response.result);
    if (response.status == 1) {
      toast.success("Purity Deleted Successfully");
    }
    let reloaded = false;

    setTimeout(() => {
      if (!reloaded) {
        window.location.reload();
        reloaded = true;
      }
    }, 5000);
  };

  useEffect(() => {
    getPurityFunc();
  }, []);

  const column = [
    {
      name: "Purity Id",
      selector: (row) => row.purity_id,
    },
    {
      name: "Jewellary Type",
      selector: (row) => row.jwellary_type,
    },
    { name: "Purity Name", selector: (row) => row.purity_name },
    {
      name: "Action",
      cell: (row) => (
        <Link
          type="button"
          name="sub"
          value="update"
          onClick={() => {
            deletePurityFunc(row.purity_id);
          }}
          style={{ color: "#c39587" }}
        >
          <FiDelete size="30px" />
        </Link>
      ),
    },
  ];
  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingLeft: "10px",
        backgroundColor: "#c39784",
      },
    },
  };
  return (
    <>
      <div className="card" style={{ marginLeft: "10px" }}>
        <div className="card-body">
          <br />
          <h4 className="card-title" style={{ fontSize: "30px" }}>
            JEWELLARY PURITY INFORMATION
            <Link to="/AddPurity">
              <button
                type="button"
                style={{ marginLeft: "50px" }}
                className="btn btn-primary mr-2"
              >
                Add Purity
              </button>
            </Link>
          </h4>

          <div className="table-responsive">
            <DataTable
              data={puritydata}
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

export default PurityData;
