const express = require("express");
const app = express();
const port = 8081;
const con_db = require("./database");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(
  "/images",
  express.static(path.join(__dirname + "/public/assets/productImages/"))
);
app.use(
  "/logoimages",
  express.static(path.join(__dirname + "/public/assets/logo/"))
);
app.use(
  "/user_profile_image",
  express.static(path.join(__dirname + "/public/assets/user_profile_images/"))
);
// app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
const user_controller = require("./controller/user.controller");
// const insertController = require("./controller/insert.controller")
var bodyParser = require("body-parser");
const loginController = require("./controller/login.controller");
const admincontroller = require("./adminController/admin.Controller");
const homepageController = require("./adminController/homePage.controller");
const adminProfileController = require("./adminController/adminProfile.controller");
const checkoutUserController = require("./controller/checkout.controller");
const AdminOrderController = require("./adminController/order.Controller");
const promocodeController = require("./adminController/promocode.Controller");
const UserorderController = require("./controller/userorder.Controller");
const invoiceController = require("./controller/invoice.controller");
const productforUser = require("./controller/product.controller");
const promocodevalidation = require("./controller/Userpromocode.controller");
const filterProductController = require("./controller/filter.controller");
const contactUserController = require("./controller/usercontact.controller");
const UserContactInfoController = require("./adminController/UserContact.controller");
const ProductPurityController = require("./adminController/purity.controller");
const deliveryloginController = require("./delivery_boyController/deliveryBoyController");
// const LivePriceController = require("./adminController/livePrice")
const adminloginForgotPassController = require("./adminController/adminForgotPassword.controller");
const addReviewController = require("./controller/product_review.controller");
app.use(cors());
// app.use(cors({ origin: "http://localhost:3000/" ,methods:["get","post","put"]}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/userList", user_controller.getUserList);
app.post("/insertData", user_controller.insert);
app.get("/deleteData/:user_id", user_controller.deleteUser);
app.post("/updateData", user_controller.updateData);

//user login
app.post("/login", loginController.login);

// category
app.post("/addcategory", admincontroller.addcategory);
app.get("/getcategory", admincontroller.getCategoryData);
app.post("/updateCategory", admincontroller.updateCategory);
app.post("/addsubcategory", admincontroller.addsubcategory);

// add product
app.post("/addProdutcName", admincontroller.AddProductName);
app.post("/addproduct", admincontroller.addProduct);

//  product purity
app.post("/addPurity", ProductPurityController.AddPurity);
app.get("/getPurity", ProductPurityController.getPurity);
app.get("/deletePurity/:purity_id", ProductPurityController.deletePurity);

//admin login
app.post("/adminLogin", admincontroller.login);
app.listen(port, () => console.log(`hello running 8081`));

// get user registration data
app.get("/userRegistrationData", admincontroller.user_data);

// get product name data
app.get("/getProdNameData", admincontroller.getProdNameData);
// get subcategory data
app.get("/getSubCategory", admincontroller.getSubcategory);
// update subcategory data
app.post("/updateSubcategory", admincontroller.UpdateSubCat);
// add size
app.post("/addSize", admincontroller.prod_size);
// get size
app.get("/getSize/:product_name_id", admincontroller.sizedata);
// update Size
app.post("/updateSize", admincontroller.updateSize);
// delete product name
app.get("/deleteProdName/:product_name_id", admincontroller.delProdName);
// get Size for Datatable
app.get("/sizeDataTable", admincontroller.sizedataTable);
// get product data
app.get("/ProductDalaList", admincontroller.getProductData);
// delete size data
app.get("/deletesize/:size_id", admincontroller.deleteSizeFunc);
// delete category data
app.get("/deleteCategory/:category_id", admincontroller.deleteCategoryFunc);
// delete subcategory data
app.get(
  "/deletesubcategory/:subcategory_id",
  admincontroller.deleteSubCategory
);
// block user
app.get("/BlockUser/:user_id", admincontroller.BlockUser);
// active user
app.get("/ActiveUser/:user_id", admincontroller.activeUser);

// get images data
app.get("/getImages", admincontroller.getImagesData);
// update product data and its images
app.post("/updateProduct", admincontroller.updateProduct);
// get product data for admin datatble
app.get("/productdatatable", admincontroller.getprodDatatable);
// delete product data
app.get("/deleteProdData/:product_id", admincontroller.deleteProdData);
// total registered user
app.get("/totaluser", homepageController.totalUser);
// toatl product
app.get("/totalProduct", homepageController.totalProduct);
// total orders
app.get("/totalOrders", homepageController.totalOrders);
// total Offers
app.get("/totalOffers", homepageController.totalOffers);

// admin profile data
app.get("/adminProfiledata/:id", adminProfileController.profileData);
// update admin profile
app.post("/updateadminprofile", adminProfileController.updateProfile);
// get user information on checkout
app.get("/UserInfo", loginController.userInfo);
// quantity less then 10
app.get("/lessQty", homepageController.lessQuantity);
// add address details on check out page
// app.post("/addAddress",user_controller.ShipAddress)
// api for sending mail on payment confirmation
app.post("/sendMail", user_controller.email);
// add product quantity when quantity are less
app.post("/updateProdQty", homepageController.updateQuantity);
// add quantity and update product quantity
app.post("/addQtyUpdateQty", homepageController.addQuantity);
// checkout data for user side
app.post("/checkoutUser", checkoutUserController.checkOut);

// get order information
app.get("/orderInformations", AdminOrderController.orderInformation);
// get order details information
app.get("/orderDetails", AdminOrderController.orderDetails);
// promocode add or offers add
app.post("/addpromocode", promocodeController.promocode);
// get promocode data
app.get("/getpromocodes", promocodeController.promocodeData);
// deactive promocodes data
app.get("/deactivePromo/:promocode_id", promocodeController.deactivePromocodes);
// get order details for user side
app.get("/getorderforuser/:user_id", UserorderController.userOrderDetails);

// invoice download user side
app.post("/generateInvoice", invoiceController.Invoice);

// product data for user side
app.get("/allproductUser/:page?/:perPage?", productforUser.getProductDataUser);

// promocode validation
app.post("/promovalidation", promocodevalidation.checkPromoCode);

// filter product user side
app.post("/filterProduct", filterProductController.filterProduct);

app.post("/usercontact", contactUserController.userContact);

// get User Contact Information
app.get("/UserContacts", UserContactInfoController.GetUserContact);

//get gold product data
app.get("/goldProduct/:page/:perPage", productforUser.getGoldProductDataUser);

//get silver product data
app.get(
  "/silverProduct/:page/:perPage",
  productforUser.getSilverProductDataUser
);

//user login forgot password
app.get("/request_otp/:email", loginController.RequestForOtp);
app.get("/verify_otp/:otp/:email", loginController.otpVerification);
app.post("/set_newpassword", loginController.NewPasswordApi);

// admin login fogot password
app.get("/sendOtp/:email", adminloginForgotPassController.sendOtp);
app.get(
  "/verify_otpadmin/:otp/:email",
  adminloginForgotPassController.otpVerification
);
app.post("/resetPassword", adminloginForgotPassController.UpdatePassword);

// add profuct review user side
app.post("/addReview", addReviewController.addreview);

// cancel order api
app.post("/cancel_order", UserorderController.OrderCancel);

// order data chart api
app.post("/OrderChart", homepageController.OrderDataChart);

// get review data
app.get("/ReviewData", addReviewController.reviewData);

// get cancelled order data
app.get("/cancelledOrderData", AdminOrderController.cancelledOrderData);

// get Dispatched Order Data
app.get("/DispatchedOrder", AdminOrderController.DispatchedOrderData);
// successfully delivered data
app.get("/DeliveredData",AdminOrderController.deliveredOrders)
// update status  confirm to out of delivery
app.get(
  "/setOutOfDeliveryStatus/:order_id/:email/:user_name",
  AdminOrderController.outOfDeliveryStatus
);

// reviews data for userside
app.get("/UserReviewData/:product_id", addReviewController.reviewDataUser);
// get product stock data
app.get("/stockData", admincontroller.getStockData);
// app.get('/livePrice', LivePriceController.LivePriceFunc);
// refund payment
app.post("/refundPayment", AdminOrderController.refundEmail);

// --------------- delivery boy api ---------------
// login delivery boy
app.post("/DeliveryLogin", deliveryloginController.deliveryLogin);
// send otp
app.post("/sendDeliveryOtp", deliveryloginController.sendDeliverdOTP);
// verify email
app.get(
  "/verifyDeliveryOTP/:otp/:email",
  deliveryloginController.otpVerification
);
// update order status to delivered
// app.post("UpdateOrderStatusConfirm", deliveryloginController.updatestatus);
