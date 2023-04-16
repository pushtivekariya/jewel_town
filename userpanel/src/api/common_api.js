import { ApiHelperGet, ApiHelperPost, ApiHelperPostImage } from ".";
import { apiRoutes } from "../constant/api_url";

const registration = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.REGISTRATION,data);
        return res;
    } catch (error) {
        throw error;
    }
}

const login = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.LOGIN,data);
        return res;
    } catch (error) {
        throw error;
    }
}
const getproducts = async () => {
    try {
        const res = await ApiHelperGet(apiRoutes.GETPRODUCT);
        return res?.result;
    } catch (error) {
        throw error;
    }
}

const getproductimages = async () => {
    try {
        const res = await ApiHelperGet(apiRoutes.GETPRODUCTIMAGES);
        return res;
    } catch (error) {
        throw error;
    }
}
const getusers = async () => {
    try {
       const res = await ApiHelperGet(apiRoutes.GETUSER);   
       return res?.result;  
    } catch (error) {
        throw error;
    }
}
const shipaddress = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.SHIPADDRESS,data);
        return res;
    } catch (error) {
        throw error;
    }
}
const getsize = async () => {
    try {
        const res = await ApiHelperGet(apiRoutes.GETSIZE);   
        return res;  
     } catch (error) {
         throw error;
     }
}

const checkout = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.CHECKOUT,data);   
        return res;  
     } catch (error) {
         throw error;
     }
}

const checkPromocode = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.CHECKPROMOCODE,data);
        return res;
    } catch (error) {
        throw error;
    }
}

const getOrderData = async (user_id) => {
    try {
        const res = await ApiHelperGet(apiRoutes.GETORDERS + `/${user_id}`);   
        return res;
        
     } catch (error) {
         throw error;
     }
}

const generateInvoice = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.GENERATEINVOICE,data);
        return res;
    } catch (error) {
        throw error;
    }
}
const getallproducts = async (page,perPage) => {
    try {
        console.log(page,"page",perPage,"perPage");
        const res = await ApiHelperGet(apiRoutes.GETALLPRODUCTS+`/${page}/${perPage}`);
        return res;
    } catch (error) {
        throw error;
    }
}

const getfilter = async (data) => {
try{
   const res = await ApiHelperPost(apiRoutes.GETFILTERPRODUCTS,data);
   return res;
}
catch (error) {
    throw error;
}
}
const getproductname = async () => {
    try {
        const res = await ApiHelperGet(apiRoutes.GETPRODUCTNAMES);
        return res;
        
    } catch (error) {
        throw error;
    }
}
const contact = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.CONTACTDATA,data);
        return res;
    } catch (error) {
        throw error;
    }
}

const updateprofile = async (data) => {
    try {
        const res = await ApiHelperPostImage(apiRoutes.UPDATEPROFILE,data);
        console.log(res,'response');
        return res;
    } catch (error) {
        throw error;
    }
}

const getGoldproducts = async (page,perPage) => {
    try {
        const res = await ApiHelperGet(apiRoutes.GOLD+`/${page}/${perPage}`);
        return res;
    } catch (error) {
        throw error;
    }
}

const getSilverproducts = async (page,perPage) => {
    try {
        const res = await ApiHelperGet(apiRoutes.SILVER+`/${page}/${perPage}`);
        return res;
    } catch (error) {
        throw error;
    }
}
const getPromocode = async () => {
    try {
        const res = await ApiHelperGet(apiRoutes.GETPROMOCODE);
        return res;
    } catch (error) {
        throw error;
    }
}

const getotprequest = async (email) => {
    try {
        const res = await ApiHelperGet(apiRoutes.OTPREQUEST + `/${email}`);
        return res;
    } catch (error) {
        throw error;
    }
}

const verificationOTP = async (otp,email) => {
    try {
        const res = await ApiHelperGet(apiRoutes.OTPVERIFACTION + `/${otp}/${email}`);
        return res;
    } catch (error) {
        throw(error);
    }
}
const setnewpassword = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.SETNEWPASSWORD,data);
        return res;
    } catch (error) {
        throw error;
    }
}
const userReview = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.REVIEWDATA,data);
        return res;
    } catch (error) {
        throw error;
    }
}
const cancelOrder = async (data) => {
    try {
        const res = await ApiHelperPost(apiRoutes.CANCELORDER,data);
        return res;
    } catch (error) {
        throw error;
    }
}
const getReview = async (product_id) => {
    try {
        const res = await ApiHelperGet(apiRoutes.GETUSERREVIEW + `/${product_id}`);
        return res;
    } catch (error) {
        throw error;
    }
}
export{
    registration,
    login,
    getproducts,
    getproductimages,
    getusers,
    shipaddress,
    getsize,
    checkout,
    checkPromocode,
    getOrderData,
    generateInvoice,
    getallproducts,
    getfilter,
    getproductname,
    contact,
    updateprofile,
    getGoldproducts,
    getSilverproducts,
    getPromocode,
    getotprequest,
    verificationOTP,
    setnewpassword,
    userReview,
    cancelOrder,
    getReview  
}