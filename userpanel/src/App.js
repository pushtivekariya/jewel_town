import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CommonRoutes from "./commonRoutes";
import Login from "./pages/login-registration/login/login";
import Script from "./scripts";

function App() {
  const login_data = JSON.parse(localStorage.getItem("login_info")) == null;
  return (
    <>
       <Script />
      <BrowserRouter>
        <CommonRoutes />
      </BrowserRouter>
   

      <ToastContainer />
    </>
  );
}

export default App;
