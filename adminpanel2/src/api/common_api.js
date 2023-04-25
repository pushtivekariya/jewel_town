import { APIRoutes } from "../constant/api_url";
import {
  // ApiHelperDelete,
  ApiHelperGet,
  ApiHelperPost,
  ApiHelperPostImage,
} from "../constant/api_helperFunc";

const insertCategory = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.ADDCATEGORY, data);
    return res;
  } catch (error) {
    throw error;
  }
};

const getCategoryList = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETCATEGORY);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

const insertsubCategory = async (data) => {
  const res = await ApiHelperPost(APIRoutes.ADDSUBCATEGORY, data);
  console.log(res.result);
  return res;
};

const addProducts = async (data) => {
  const res = await ApiHelperPostImage(APIRoutes.ADDPRODUCT, data);
  console.log(res.result);
  return res;
};

const adminLogin = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.ADMINLOGIN, data);
    // console.log(res.result);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getuserData = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETUSERREGISTRATIONDATA);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateCategoryInfo = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.UPDATECATEGORY, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateSubcategory = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.UPDATESUBCATEGORY, data);
    console.log(res, "response");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const addProductName = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.ADDPRODUCTNAME, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getProdNameData = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETPRODUCTNAMEDATA);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getSubCategory = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETSUBCATEGORY);
    console.log(res, "reeeeeesssss");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const addProdSize = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.ADDPRODSIZE, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
const getSizeData = async (product_name_id) => {
  try {
    const res = await ApiHelperGet(
      APIRoutes.GETSIZEDATA + `/${product_name_id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
const updateSizeData = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.UPDATESIZE, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteProdName = async (product_name_id) => {
  try {
    const res = await ApiHelperGet(
      APIRoutes.DELETEPRODNAME + `/${product_name_id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getsizeDataTable = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.SIZEDATATABLE);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getProdList = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.PRODUCTDATA);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteSizeApi = async (size_id) => {
  try {
    const res = await ApiHelperGet(APIRoutes.DELETESIZE + `/${size_id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// delete category
const deleteCategoryApi = async (category_id) => {
  try {
    const res = await ApiHelperGet(
      APIRoutes.DELETECATEGORY + `/${category_id}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
// delete subcategory
const deleteSubCatApi = async (subcategory_id) => {
  try {
    const res = await ApiHelperGet(
      APIRoutes.DELETESUBCATEGORY + `/${subcategory_id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
// block user
const blockUserApi = async (user_id,email) => {
  try {
    const res = await ApiHelperGet(APIRoutes.BLOCKUSER + `/${user_id}/${email}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// active user
const activeUserApi = async (user_id,email) => {
  try {
    const res = await ApiHelperGet(APIRoutes.ACTIVEUSER + `/${user_id}/${email}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// get images data
const getImageApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETIMAGES);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// update product data and images
const updateProductApi = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.UPDATEPRODUCTS, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getproddataapi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETPRODDATATABLE);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// delete product data
const deleteProdApi = async (product_id) => {
  try {
    const res = await ApiHelperGet(APIRoutes.DELETEPRODDATA + `/${product_id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const totalUserApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.TOTALUSER);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const totalProduct = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.TOTALPRODUCT);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// total orders
const totalOrderApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.TOTALORDERS);
    return res;
  } catch (error) {
    console.log(error);
  }
};
// total offers
const totalOffersApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.TOTALOFFERS);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// admin profile data
const profiledata = async (id) => {
  try {
    const res = await ApiHelperGet(APIRoutes.PROFILEDATA + `/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateadminProfileapi = async (data) => {
  try {
    const res = await ApiHelperPostImage(APIRoutes.UPDATEADMINPROFILE, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const lessProductQty = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.LESSPRODQTY);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// add product qunatity
const addProdQuantiy = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.ADDPRODUCTQUANTITY, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// get order information
const getordersInfo = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETORDERINFO);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// get order details
const orderDetailsApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.ORDERDETAILS);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// get promocodes data
const getpromdataApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETPROMOCODES);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// deactive promocode or delete
const deactivepromoApi = async (promocode_id) => {
  try {
    const res = await ApiHelperGet(
      APIRoutes.DEACTIVEPROMO + `/${promocode_id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const addpromocodes = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.ADDPROMOCODE, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// get user contact information
const getUserContactInfo = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.USERCONTACTS);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Add  jewellary quantity
const addPurityApi = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.ADDPURITY, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// get product purity
const getPurityApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETPURITY);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// delete Product Purity
const deletePurity = async (purity_id) => {
  try {
    const res = await ApiHelperGet(APIRoutes.DELETEPURITY + `/${purity_id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// live price
// const livePriceApi = async () => {
//   try {
//     const res = await ApiHelperGet(APIRoutes.LIVEPRICE);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// send otp and verify email for forgot password
const sendOtpApi = async (email) => {
  try {
    const res = await ApiHelperGet(APIRoutes.SENDOTP + `/${email}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
// verify otp
const verifyOtpApi = async (otp, email) => {
  try {
    const res = await ApiHelperGet(APIRoutes.VERIFYOTP + `/${otp}/${email}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// set new password or update password
const UpdatePassword = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.CHANGEPASSWORD, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ORDER DATA chart
const orderdataChart = async () => {
  try {
    const res = await ApiHelperPost(APIRoutes.ORDERCHARTDATA);
    return res;
  } catch (error) {
    console.log(error);
  }
};
// get user review data
const urserReviewData = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.USERREVIEWDATA);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// cancelled order data
const cencelledorderData = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.CANCELLEDORDERDATA);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// set Out Of Delivery status  of Order
const updateorderstatus = async (order_id, email, user_name) => {
  try {
    const res = await ApiHelperGet(
      APIRoutes.SETOUTOFDELIVERYSTATUS + `/${order_id}/${email}/${user_name}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

// product stock data
const stockDataApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.GETSTOCKDATA);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// dispatched order data
const dispachedOrderApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.DISPATCHEDORDERDATA);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// refund payment api
const refundPaymentApi = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.REFUNDPAYMENT, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// delivered order data
const deliveredOrderDataApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.DELIVEREDDATA);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export {
  getCategoryList,
  insertsubCategory,
  insertCategory,
  addProducts,
  adminLogin,
  getuserData,
  updateCategoryInfo,
  addProductName,
  getProdNameData,
  getSubCategory,
  updateSubcategory,
  addProdSize,
  getSizeData,
  updateSizeData,
  deleteProdName,
  getsizeDataTable,
  getProdList,
  deleteSizeApi,
  deleteCategoryApi,
  deleteSubCatApi,
  blockUserApi,
  getImageApi,
  updateProductApi,
  getproddataapi,
  activeUserApi,
  deleteProdApi,
  totalUserApi,
  totalProduct,
  profiledata,
  updateadminProfileapi,
  lessProductQty,
  addProdQuantiy,
  getordersInfo,
  orderDetailsApi,
  getpromdataApi,
  deactivepromoApi,
  addpromocodes,
  totalOrderApi,
  totalOffersApi,
  getUserContactInfo,
  addPurityApi,
  getPurityApi,
  deletePurity,
  // livePriceApi,
  sendOtpApi,
  verifyOtpApi,
  UpdatePassword,
  orderdataChart,
  urserReviewData,
  cencelledorderData,
  updateorderstatus,
  stockDataApi,
  dispachedOrderApi,
  refundPaymentApi,
  deliveredOrderDataApi,
};
