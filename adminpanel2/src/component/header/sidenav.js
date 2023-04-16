import React from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {
  return (
    <>
    {/* <nav class="sidebar sidebar-offcanvas active" id="sidebar"></nav> */}
    <div className="scrollable-content" >
      <nav className="sidebar sidebar-offcanvas active" id="sidebar" >
  <ul className="nav">
    <li className="nav-item">
      <Link className="nav-link" to='/home'>
        <i className="icon-grid menu-icon" />
        
        <span className="menu-title">Dashboard</span>
      
      </Link>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#error"
        aria-expanded="false"
        aria-controls="error"
      >
         <i className="icon-columns menu-icon" />
        <span className="menu-title">Product Reference</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="error">
        <ul className="nav flex-column sub-menu">
        <li className="nav-item">
            <Link className="nav-link" to='/product_nameData'>
               Product Names
            </Link>
          </li>
        <li className="nav-item">
            <Link className="nav-link" to='/sizeData'>
            Product Size
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/PurityData'>
               Product Purity
            </Link>
          </li>
        </ul>
      </div>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#ui-basic"
        aria-expanded="false"
        aria-controls="ui-basic"
      >
        <i className="icon-layout menu-icon" />
        <span className="menu-title">Categories</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="ui-basic">
        <ul className="nav flex-column sub-menu">
        
          <li className="nav-item">
            <Link className="nav-link" to='/get_category'>
              Category
            </Link>
          </li>
        
          <li className="nav-item">
           
            <Link className="nav-link" to='/getSubCatData'>
               Sub Category
            </Link>
          </li> 
        </ul>
      </div>
    </li>
   
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#form-elements"
        aria-expanded="false"
        aria-controls="form-elements"
      >
        <i className="icon-columns menu-icon" />
        <span className="menu-title">Product</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="form-elements">
        <ul className="nav flex-column sub-menu">
       
          {/* <li className="nav-item">
            <Link className="nav-link" to='/product_nameData'>
               product Names Data
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to='/productdata'>
              All Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/stockData'>
             Stock History
            </Link>
          </li>
         

        </ul>
      </div>
      
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#charts"
        aria-expanded="false"
        aria-controls="charts"
      >
        <i className="icon-head menu-icon" />
        <span className="menu-title">User Information</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="charts">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
           
            <Link className="nav-link" to='/user_information'>
              Registered User
            </Link>
          </li>
          <li className="nav-item">
           
           <Link className="nav-link" to='/UserInformation'>
            
             Contact Inforamtion
           </Link>
         </li>
        </ul>
      </div>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#tables"
        aria-expanded="false"
        aria-controls="tables"
      >
        <i className="icon-grid-2 menu-icon" />
        <span className="menu-title">Orders</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="tables">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
           
            <Link className="nav-link" to='/orderInformation'>
             Arrived Order 
            </Link>
          </li>
          <li className="nav-item">
           
           <Link className="nav-link" to='/cancelledOrder'>
           Cancelled Order 
           </Link>
         </li>
         <li className="nav-item">
           
           <Link className="nav-link" to='/dispatchedOrder'>
           Dispatched Order 
           </Link>
         </li>
           
         <li className="nav-item">
           
           <Link className="nav-link" to='/DeliveredOrders'>
           Delivered Order 
           </Link>
         </li>
        </ul>
      </div>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#icons"
        aria-expanded="false"
        aria-controls="icons"
      >
        <i className="icon-contract menu-icon" />
        <span className="menu-title">Offers</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="icons">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
           
            <Link className="nav-link" to='/promocodesdata'>
             All Offers
            </Link>
          </li>
        </ul>
      </div>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#auth"
        aria-expanded="false"
        aria-controls="auth"
      >
        <i className="icon-head menu-icon" />
        <span className="menu-title">User Review</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="auth">
        <ul className="nav flex-column sub-menu">
      
        <li className="nav-item">
           
           <Link className="nav-link" to='/Reviews'>
             All Reviews
           </Link>
         </li>
        </ul>
      </div>
    </li>
   
    {/* <li className="nav-item">
      <Link className="nav-link" to='/'>
        <i className="icon-paper menu-icon" />
        <span className="menu-title">Documentation</span>
      </Link>
    </li> */}
  </ul>
</nav>
</div>
    </>
  )
}

export default Sidenav
