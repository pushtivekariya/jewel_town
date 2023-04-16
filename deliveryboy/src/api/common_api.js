import { APIRoutes } from "../constant/api_url";
import { ApiHelperGet, ApiHelperPost } from "../constant/api_helperfunction";
import { post } from "jquery";

// delivery boy login controller
const deliveryLoginApi = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.LOGIN, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// dispatched order information
const dispatchedOrderApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.DISPATCHEDORDER);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// order details information
const OrderDetailsApi = async () => {
  try {
    const res = await ApiHelperGet(APIRoutes.ORDERDETAILS);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// send otp to user for delivery boy
const sendOtpApi = async (data) => {
  try {
    const res = await ApiHelperPost(APIRoutes.SENDOTP ,data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// verify otp and update order status
const verifyOTPApi = async (otp,email)=>{
    try {
        const res = await ApiHelperGet(APIRoutes.VERIFYOTP+`/${otp}/${email}`)
        return res;
    } catch (error) {
        console.log(error);
    }
}

export { deliveryLoginApi, dispatchedOrderApi, OrderDetailsApi, sendOtpApi,verifyOTPApi };
