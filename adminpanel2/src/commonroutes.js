import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProdSize from "./pages/category/addProdSize";
import Category from "./pages/category/category";
import CategoryData from "./pages/category/categoryData";
import SizeData from "./pages/category/sizeData";
import SubCategoryData from "./pages/category/subCategoryData";
import UpdateCategory from "./pages/category/updateCategory";
import UpdateSize from "./pages/category/updateSize";
import Home from "./pages/home/home";
import Orders from "./pages/orders/orders";
import Addprodquantity from "./pages/product/addProdQuantity/addprodquantity";
import Addproduct from "./pages/product/addproduct";
import ProductData from "./pages/product/productData";
import ProductNameData from "./pages/product/productNameData";
import UpdateProduct from "./pages/product/updateProduct";
import Addpromocode from "./pages/promocodes/addpromocode";
import Getpromocode from "./pages/promocodes/getpromocode";
import Subcategory from "./pages/subcategory/subcategory";
import UpdateSubCategory from "./pages/subcategory/updateSubCategory";
import Usercontact from "./pages/userContacts/usercontact";
import UserRegistrationInfo from "./pages/user_information/userRegistrationInfo";
import ProfileData from "./profile/profileData";
import UpdateProfile from "./profile/updateProfile";
import ProductName from "./pages/product/productName";
import AddPurity from "./pages/purity/addPurity";
import PurityData from "./pages/purity/purityData";
import UserReview from "./pages/ReviewData/userReview";
import CancelledOrder from "./pages/orders/cancelledOrder";
import ProductStock from "./pages/ProductStock/productStock";
import DispatchedOrder from "./pages/orders/dispatchedOrder";
import DeliveredOrder from "./pages/orders/deliveredOrder";

const Commonroutes = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/user_information" element={<UserRegistrationInfo />} />
        <Route path="/get_category" element={<CategoryData />} />
        <Route path="/update_category" element={<UpdateCategory />} />
        <Route path="/product_name" element={<ProductName />} />
        <Route path="/product_nameData" element={<ProductNameData />} />
        <Route path="/getSubCatData" element={<SubCategoryData />} />
        <Route path="/updateSubCat" element={<UpdateSubCategory />} />
        <Route path="/addSize" element={<AddProdSize />} />
        <Route path="/sizeData" element={<SizeData />} />
        <Route path="/updatesize" element={<UpdateSize />} />
        <Route path="/productdata" element={<ProductData />} />
        <Route path="/updateproduct" element={<UpdateProduct />} />
        <Route path="/profileData" element={<ProfileData />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/addProdQty" element={<Addprodquantity />} />
        <Route path="/orderInformation" element={<Orders/>}/>
        <Route path="/promocodesdata" element={<Getpromocode/>}/>
        <Route path="/addpromocodes" element={<Addpromocode/>}/>
        <Route path="/UserInformation" element={<Usercontact/>}/>
        <Route path="/addPurity" element={<AddPurity/>}/>
        <Route path="/PurityData" element={<PurityData/>}/>
       <Route path="/Reviews" element={<UserReview/>}/>
       <Route path="/cancelledOrder" element={<CancelledOrder/>}/>
       <Route path="/stockData" element={<ProductStock/>}/>
       <Route path="/dispatchedOrder" element={<DispatchedOrder/>}/>
       <Route path="/DeliveredOrders" element={<DeliveredOrder/>}/>
      </Routes>
    </>
  );
};

export default Commonroutes;
