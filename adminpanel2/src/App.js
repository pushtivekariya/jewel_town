import { BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CommonFiles from "./commonFiles";
import LoginRoute from "./loginRoute";

function App() {
  const login_details = JSON.parse(localStorage.getItem("Login_info")) == null;
  // const localStoragedata = localStorage.getItem == null;

  return (
    <>
      <BrowserRouter>
        
        {login_details ? (
          <>

          <LoginRoute />
       
          </>
        ) : (
          <>
            <CommonFiles />
   
          </>
        )  }

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
