import React from "react";
import Commonroutes from "./commonroutes";
import Header from "./component/header/header";
import Rightside from "./component/header/rightside";
import Sidenav from "./component/header/sidenav";

const CommonFiles = () => {
  return (
    <>
      <div class="container-scroller">
        <Header />
        <div class="container-fluid page-body-wrapper">
          <Rightside />
          <Sidenav />
          <Commonroutes />
        </div>
      </div>
    </>
  );
};

export default CommonFiles;
