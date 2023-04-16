import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiBlock } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deactivepromoApi, getpromdataApi } from "../../api/common_api";

const Getpromocode = () => {
  const [getpromocodeinfo, setgetpromocodeinfo] = useState([]);
  const [deletePromo, setdeletePromo] = useState([]);

  const getpromocodefunc = async () => {
    const response = await getpromdataApi();
    setgetpromocodeinfo(response.result);
  };

  const deletePromoFunc = async (promocode_id) => {
    const response = await deactivepromoApi(promocode_id);
    setdeletePromo(response.response);
    if (response.status == 1) {
      toast.success("Promocode Deleted");
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
    getpromocodefunc();
  }, []);
  

  
  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        backgroundColor: "#c39784",
      },
    },
  };
  const columns = [
    {
      name: "Promocode Id",
      selector: (row) => row.promocode_id,
      width: "130px",
    },
    {
      name: "Promocode",
      selector: (row) => row.promocode,
    },
    {
      name: "Promocode Type",
      selector: (row) => row.promocode_type,
      width: "150px",
    },
    {
      name: "Discount Amount",
      selector: (row) => row.promocode_discount_amount,
      width: "160px",
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
      width: "110px",
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      width: "110px",
    },
    {
      name: "Number of Use",
      selector: (row) => row.no_of_use,
      width: "140px",
    },
    {
      name: "Minimum Discount Amount",
      selector: (row) => row.minimum_order_amount,
      width: "180px",
    },
    // {
    //     name:"Status",
    //     cell:(row)=>{
    //         if (row.status == 0 ) {
    //             return(<>
    //                 <p>Active</p>
    //             </>)
    //         } else {
    //             return(<>
    //                 <p>Deactive</p>
    //             </>)
    //         }
    //     }
    // },
    {
      name: "   Actions   ",
      cell: (row) => {
        if (row.status == 0) {
          return (
            <Link
              type="button"
              name="sub"
              value="update"
              onClick={() => {
                deletePromoFunc(row.promocode_id);
                window.location.reload();
              }}
              style={{ color: "#c39587" }}
            >
              <BiBlock size="30px" />
            </Link>
          );
        }
      },
    },
  ];
  return (
    <>
      <div className="card">
        <div className="card-body">
          <br />
          <h4
            className="card-title"
            style={{ marginLeft: "60px", fontSize: "30px" }}
          >
            PROMOCODE INFORMATION
            <Link to="/addpromocodes">
              <button
                type="button"
                style={{ marginLeft: "50px" }}
                className="btn btn-primary mr-2"
              >
                Add Promocodes
              </button>
            </Link>
          </h4>

          <div className="table-responsive">
            <DataTable
              data={getpromocodeinfo}
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

export default Getpromocode;
