import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Orders from './orders/orders';
import Enterotp from './otpInput/enterotp';
const Routing = () => {
  const deliveryLoginInfo = JSON.parse(localStorage.getItem("DeliveryBoyLogin_Info"));
  return (
    <>
      <Routes>
      {
        deliveryLoginInfo == null ? (
          <>
          <Route path='/' element={<Login/>} />
          </>
        ):(
          <>
<Route path='/' element={<Orders/>}/>
<Route path='/enterOtp' element={<Enterotp/>} />
          </>
        )
      }
       
      </Routes>
      
    </>
  );
}

export default Routing;
