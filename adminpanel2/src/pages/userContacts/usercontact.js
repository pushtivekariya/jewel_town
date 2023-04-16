import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import { getUserContactInfo } from '../../api/common_api';

const Usercontact = () => {

const [userContacts, setuserContacts] = useState([]);

const ContactInformation = async ()=>{
const response = await getUserContactInfo();
console.log(response);
setuserContacts(response.result);
}
useEffect(() => {
  ContactInformation()
}, []);

const column = [{
    name :"Contact Id",
    selector:(row)=>row.contact_id,
    width:"100px"
},{
    name :" User Name",
    selector :(row)=>row.name,
    width:"150px"
},{
    name : "Email",
    selector :(row)=>row.email,
    width:"220px"
},{
    name :"Message",
    selector :(row)=>row.comment
}]
const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingLeft: '10px',
        justifyContent: 'center',
        backgroundColor: "#c39784",
      },
    },
  };
  return (
    <>
         <div className="card" style={{ marginLeft: "10px" }}>
      <br/>
        <div className="card-body">
          <h4
            className="card-title"
            style={{ textAlign: "center", fontSize: "30px" }}
          >
          USER CONTACT INFORMATION 
          </h4>
         
         
          <div className="table-responsive">
            
            <DataTable
              data={userContacts}
              columns={column}
              pagination
              customStyles={tableCustomStyles}

            />
          </div>
          <ToastContainer/>
        </div>
      </div>
    </>
  );
}

export default Usercontact;
