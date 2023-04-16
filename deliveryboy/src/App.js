import { BrowserRouter } from "react-router-dom";
import Routing from "./routing";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routing/>
     <ToastContainer/>
      </BrowserRouter>
    </>
  );
}

export default App;
