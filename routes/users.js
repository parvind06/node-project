var express = require('express');
var AuthenticationController = require('../controller/AuthenticationController.js');
const requireAuthentication = require("../passport").authenticateUser;
var router = express.Router();

router.post('/log-in', AuthenticationController.logIn);
router.post('/sign-up', AuthenticationController.signUp);
router.post('/refresh-token', AuthenticationController.refreshToken);
router.post('/confirm-otp', AuthenticationController.confirmOtp);
router.post('/resend-otp', AuthenticationController.resendOtp);
router.post('/change-password', requireAuthentication, AuthenticationController.changePassword);
router.post('/forgot-password', AuthenticationController.forgotpassword);
router.post('/update-password', AuthenticationController.updatePassword);
router.get('/getMydetail', requireAuthentication, AuthenticationController.getMydetail);
router.post('/add-user-address', requireAuthentication, AuthenticationController.addUserAddress);
router.get('/get-user-address', requireAuthentication, AuthenticationController.getUserAddress);
router.get("/delete-account", requireAuthentication, AuthenticationController.DeleteAccount);
router.post("/Edit-profile", requireAuthentication, AuthenticationController.EditProfile);
router.get("/delete-address", requireAuthentication, AuthenticationController.DeleteAddress);
router.post("/edit-address", requireAuthentication, AuthenticationController.EditAddress)
router.post("/edit-vendor-profile", requireAuthentication, AuthenticationController.editVendorProfile)
router.get('/about-vendor-profile', requireAuthentication, AuthenticationController.getVendorProfile);
router.post('/update-vendor', requireAuthentication, AuthenticationController.updateVendor);


module.exports = router
