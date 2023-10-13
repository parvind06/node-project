const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
let helper = require("../config/helper");
let validator = require("../middleware/validation")
const db = require("../models");
var randomstring = require("randomstring");
const JWTDecode = require("jwt-decode");

const Stripe = require('stripe');
const stripe = Stripe('sk_test_6pLA6JU3fnwYPv8vlRGhnx8B');

const JWT_TOKEN = process.env.JWT_SECRET;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_SECRET;
const JWT_TOKEN_TIME = process.env.JWT_TOKEN_TIME;
const JWT_REFRESH_TIME = process.env.JWT_REFRESHTOKEN_TIME;

const User = db.users;
const vendor_store = db.vendor_store;
const Vendor_images = db.vendor_images;
const userAddress = db.user_address;
Vendor_images.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(vendor_store, { foreignKey: "user_id" });
vendor_store.hasMany(Vendor_images, { 'foreignKey': 'user_id', 'targetKey': 'id', 'as': 'Vendor_imageData' });
module.exports = {
    signUp: async (req, res) => {
        try {
            const customer = await stripe.customers.create({
                email: req.body.email
            });
            const cusId = customer.id;
            let required = {
                role: req.body.role,
                email: req.body.email,
                password: req.body.password,
            };
            const nonrequired = {
                username: req.body.username,
                shop_name: req.body.shop_name,
                shop_address_1: req.body.shop_address_1,
                shop_address_2: req.body.shop_address_2,
                shop_state: req.body.shop_state,
                shop_city: req.body.shop_city,
                shop_pincode: req.body.shop_pincode,
                landmark: req.body.landmark,
                customer_id: cusId,
                shop_no: req.body.shop_no,
                shop_country: req.body.shop_country,
                shop_latitude: req.body.shop_latitude,
                shop_longitude: req.body.shop_longitude,
                shop_doc_number: req.body.shop_doc_number,
                status: req.body.status,
                is_age: req.body.is_age
            };
            var requiredData = await helper.vaildObject(required, nonrequired);
    
            let email = await User.findOne({
                where: {
                    email: requiredData.email,
                },
            });
            if (email) {
                return helper.error(
                    res,
                    "Your account already registered with us. Please login"
                );
            }
    
    
            var createOtp = randomstring.generate({
                length: 6,
                charset: "numeric",
            });
            let salt = 10;
            await bcrypt.hash(requiredData.password, salt).then(function (hash) {
                requiredData.password = hash;
            });
    
            requiredData.otp = createOtp;
            let user = await User.create(requiredData);
            let profile = await new vendor_store();
            profile.user_id = user.id;
            profile.shop_name = requiredData.shop_name;
            profile.is_age = requiredData.is_age;
            profile.customer_id = requiredData.customer_id
            profile.shop_address_1 = requiredData.shop_address_1;
            profile.shop_address_2 = requiredData.shop_address_2
            profile.shop_state = requiredData.shop_state
            profile.shop_city = requiredData.shop_city
            profile.shop_pincode = requiredData.shop_pincode;
            profile.landmark = requiredData.landmark;
            profile.shop_country = requiredData.shop_country;
            profile.shop_latitude = requiredData.shop_latitude;
            profile.shop_longitude = requiredData.shop_longitude;
            profile.shop_doc_number = requiredData.shop_doc_number;
            profile.shop_no = requiredData.shop_no
            profile.status = '1';
    
            profile.save();
    
            let fullName = req.body.role == 1 ? req.body.username : req.body.shop_name;
            // await helper.emailSend(req.body.email, fullName, createOtp);
    
            if (user) {
                let accessToken = jwt.sign(
                    { data: { id: user.id, email: user.email } },
                    JWT_TOKEN,
                    { expiresIn: "6000s" }
                );
                const refreshToken = jwt.sign(
                    { data: { id: user.id, email: user.email } },
                    JWT_REFRESH_TOKEN,
                    { expiresIn: "21d" }
                );
                // var body = { "token": await helper.encrypt(accessToken), "refresh_token": await helper.encrypt(refreshToken), "expires_in": JWT_TOKEN_TIME,"refresh_expires_in": JWT_REFRESH_TIME };
                var body = {
                    token: accessToken,
                    refresh_token: refreshToken,
                    expires_in: JWT_TOKEN_TIME,
                    refresh_expires_in: JWT_REFRESH_TIME,
                    otp_verify: user.otp_verify,
                };
    
                return helper.success(res, "User registered successfully", body);
            } else {
                return helper.error(res, "Some error occur, Please try again");
            }
        } catch (err) {
            return helper.error(res, err);
        }
    },
    logIn: async (req, res) => {
        try {
            const required = {
                role: req.body.role,
                email: req.body.email,
                password: req.body.password,
            };
            const nonrequired = {};
            const requestedData = await helper.vaildObject(required, nonrequired);
            validator.isValidEmail(requestedData.email)
            console.log(requestedData.email,);

            var user = await User.findOne({
                where: {
                    email: requestedData.email,
                },
            });
            if (!user) {
                return helper.error(res, "This email is not associated with us");
            }
            if (requestedData.role != user.role) {
                return helper.error(res, "This email and password is not associated with us");
            }
            // console.log(user);
            await bcrypt
                .compare(requestedData.password, user.password)
                .then(async function (result) {
                    if (result == true) {
                        let accessToken = jwt.sign(
                            { data: { id: user.id, email: user.email } },
                            JWT_TOKEN,
                            { expiresIn: "6000s" }
                        );
                        const refreshToken = jwt.sign(
                            { data: { id: user.id, email: user.email } },
                            JWT_REFRESH_TOKEN,
                            { expiresIn: "21d" }
                        );
                        // var body = { "token": await helper.encrypt(accessToken), "refresh_token": await helper.encrypt(refreshToken), "expires_in": JWT_TOKEN_TIME,"refresh_expires_in": JWT_REFRESH_TIME };
                        var body = {
                            token: accessToken,
                            refresh_token: refreshToken,
                            expires_in: JWT_TOKEN_TIME,
                            refresh_expires_in: JWT_REFRESH_TIME,
                            otp_verify: user.otp_verify,
                        };
                        return helper.success(res, "User log in successfully", body);
                    } else {
                        return helper.error(res, "Password do not match");
                    }
                });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    refreshToken: async (req, res) => {
        try {
            let required = {
                refresh_token: req.body.refresh_token,
                scope: req.body.scope,
            };
            const nonrequired = {};
            var requiredData = await helper.vaildObject(required, nonrequired);

            if (requiredData.scope === "refresh_token") {
                var decoded = JWTDecode(requiredData.refresh_token);
                let user_id = decoded.data.id;
                let user = await User.findOne({
                    where: {
                        id: user_id,
                    },
                });
                let accessToken = jwt.sign(
                    { data: { id: user.id, email: user.email } },
                    JWT_TOKEN,
                    { expiresIn: "6000s" }
                );
                const refreshToken = jwt.sign(
                    { data: { id: user.id, email: user.email } },
                    JWT_REFRESH_TOKEN,
                    { expiresIn: "6000s" }
                );
                // var body = { "token": await helper.encrypt(accessToken), "refresh_token": await helper.encrypt(refreshToken), "expires_in": JWT_TOKEN_TIME,"refresh_expires_in": JWT_REFRESH_TIME };
                var body = {
                    token: accessToken,
                    refresh_token: refreshToken,
                    expires_in: JWT_TOKEN_TIME,
                    refresh_expires_in: JWT_REFRESH_TIME,
                };
                return helper.success(res, "New access token", body);
            } else {
                return helper.error(res, "Invalid scope");
            }
        } catch (err) {
            return helper.error(res, err);
        }
    },
    confirmOtp: async (req, res) => {
        try {
            var required = { otp: req.body.otp, email: req.body.email };
            const nonrequired = {};
            await helper.vaildObject(required, nonrequired);
            let otp = await User.findOne({ where: { email: req.body.email } });
            if (req.body.otp == otp.otp) {
                otp.otp = "";
                otp.otp_verify = '1';
                otp.save();
                return helper.success(res, "Otp matched successfully");
            } else {
                return helper.error(res, "Invalid OTP. Please try again");
            }
        } catch (err) {
            return helper.error(res, err);
        }
    },
    resendOtp: async (req, res) => {
        try {
            var required = { email: req.body.email };
            const nonrequired = {};
            await helper.vaildObject(required, nonrequired);
            var createOtp = await randomstring.generate({
                length: 6,
                charset: "numeric",
            });
            let user = await User.findOne({ where: { email: req.body.email } });
            user.otp = createOtp;
            user.otp_verify = '0';
            user.save();

            let profile = await vendor_store.findOne({
                where: { user_id: user.id },
            });
            let fullName = user.role == 1 ? user.username : profile.shop_name;
            await helper.emailSend(user.email, fullName, createOtp);
            return helper.success(res, "Otp send successfully");
        } catch (err) {
            return helper.error(res, err);
        }
    },
    changePassword: async (req, res) => {
        try {
            const required = {
                oldPassword: req.body.oldPassword,
                newPassword: req.body.newPassword,
            };
            const nonRequired = {};
            let requestData = await helper.vaildObject(required, nonRequired);
            let userdata = await User.findOne({
                attributes: ["id", "password"],
                where: { id: req.user.id },
            });

            await bcrypt
                .compare(requestData.oldPassword, userdata.password)
                .then(function (result) {
                    if (result != true) {
                        throw "old password doesn't match.";
                    } else if (requestData.oldPassword == requestData.newPassword) {
                        throw "New password should not be same as old password.";
                    }
                });
            let salt = 10;
            await bcrypt.hash(requestData.newPassword, salt).then(function (hash) {
                requestData.newPassword = hash;
            });
            userdata.password = requestData.newPassword;
            userdata.save();
            return helper.success(res, "Password changed successfully.", {});
        } catch (err) {
            helper.error(res, err);
        }
    },
    changePassword:async(req,res,next)=>{
        

    },
    forgotpassword: async (req, res) => {
        try {
            var required = { email: req.body.email };
            const nonrequired = {};
            await helper.vaildObject(required, nonrequired);

            let user = await User.findOne({ where: { email: req.body.email } });
            if (user) {
                var createOtp = randomstring.generate({
                    length: 6,
                    charset: "numeric",
                });
                user.otp = createOtp;
                user.otp_verify = '0';
                user.save();

                let profile = await vendor_store.findOne({
                    where: { user_id: user.id },
                });
                let fullName = user.role == 1 ? user.username : profile.shop_name;
                await helper.emailSend(user.email, fullName, createOtp);
                return helper.success(res, "Otp send successfully");
            } else {
                return helper.error(res, "This email is not associated with us");
            }
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updatePassword: async (req, res) => {

        try {
            var required = { email: req.body.email, password: req.body.password };
            const nonrequired = {};
            await helper.vaildObject(required, nonrequired);

            let userEmail = await User.findOne({ where: { email: req.body.email } });
            if (userEmail) {
                var saltRounds = 10;
                await bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
                    userEmail.password = hash;
                });
                userEmail.save();
                return helper.success(res, "Password changed successfully");
            } else {
                return helper.error(res, "Please enter the valid email");
            }
        } catch (err) {
            return helper.error(res, err);
        }
    },
    getMydetail: async (req, res) => {
        try {
            let userdata = await User.findOne({
                where: {
                    id: req.user.id,
                },
                include: [
                    {
                        model: vendor_store,
                        include: [{
                            model: Vendor_images,
                            as: "Vendor_imageData",
                        }]
                    },
                ],
            });
            return helper.success(res, "My details get successfully", userdata);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updateVendor: async (req, res) => {
        try {
            const data = req.body;
            const vendorData = await vendor_store.findOne({ where: { user_id: req.user.id } });

            if (!vendorData) {
                return helper.error(res, 'Vendor not found');
            }
            Object.assign(vendorData, data);
            await vendorData.save();
            return helper.success(res, 'Vendor updated successfully');
        } catch (err) {
            return helper.error(res, err);
        }
    },
    addUserAddress: async (req, res) => {
        try {
            const required = {
                type: req.body.type,
                address_1: req.body.address_1,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,

            };
            const nonRequired = {
                address_2: req.body.address_2,
                country: req.body.country,
                landmark: req.body.landmark,
            };
            let requestData = await helper.vaildObject(required, nonRequired);

            let useraddress = await new userAddress();
            useraddress.user_id = req.user.id;
            useraddress.type = requestData.type;
            useraddress.address_1 = requestData.address_1;
            useraddress.address_2 = requestData.address_2;
            useraddress.state = requestData.state;
            useraddress.city = requestData.city;
            useraddress.landmark = requestData.landmark;
            useraddress.pincode = requestData.pincode;
            useraddress.latitude = requestData.latitude;
            useraddress.longitude = requestData.longitude;
            useraddress.country = requestData.country;

            useraddress.save();
            return helper.success(res, "Added successfully.");
        } catch (err) {
            helper.error(res, err);
        }
    },
    getUserAddress: async (req, res) => {
        try {
            let useraddress = await userAddress.findAll({
                where: {
                    user_id: req.user.id,
                },
            });
            return helper.success(res, "get address successfully.", useraddress);
        } catch (err) {
            helper.error(res, err);
        }
    },
    DeleteAddress: async (req, res) => {
        try {
            const addressData = await userAddress.findOne({ where: { user_id: req.user.id } });
            if (!addressData) {
                return helper.error(res, "User address not found.");
            }

            const deletedAddress = await userAddress.destroy({
                where: {
                    id: req.query.AddressId
                }
            });

            if (deletedAddress === 0) {
                return helper.error(res, "Address deletion failed. Address not found.");
            }

            return helper.success(res, "User address deleted successfully.");
        } catch (err) {
            return helper.error(res, err);
        }
    },
    EditAddress: async (req, res) => {
        try {
            const required = {

            };
            const nonRequired = {
                type: req.body.type,
                address_1: req.body.address_1,
                address_2: req.body.address_2,
                state: req.body.state,
                city: req.body.city,
                landmark: req.body.landmark,
                pincode: req.body.pincode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                country: req.body.country,
            };
            let requestData = await helper.vaildObject(required, nonRequired);
            let EditData = await userAddress.findOne({ where: { id: req.body.AddressId } });
            EditData.user_id = req.user.id;
            EditData.type = requestData.type;
            EditData.address_1 = requestData.address_1;
            EditData.address_2 = requestData.address_2;
            EditData.state = requestData.state;
            EditData.city = requestData.city;
            EditData.landmark = requestData.landmark;
            EditData.pincode = requestData.pincode;
            EditData.latitude = requestData.latitude;
            EditData.longitude = requestData.longitude;
            EditData.country = requestData.country;
            EditData.save();
            await EditData.save();
            return helper.success(res, "UserAddress updated  successfully.", EditData);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    EditProfile: async (req, res) => {
        try {
            const required = {};
            const nonRequired = {
                Username: req.body.username,
                Profile_pic: req.body.profile_pic
            };
            let requestData = await helper.vaildObject(required, nonRequired);
            const user = await User.findOne({ where: { id: req.user.id } });
            if (requestData.Username) {
                user.username = requestData.Username;
            }
            if (requestData.Profile_pic) {
                user.profile_pic = requestData.Profile_pic;
            }
            await user.save();
            return helper.success(res, "Profile edited successfully.");
        } catch (err) {
            return helper.error(res, err);
        }
    },
    editVendorProfile: async (req, res) => {
        try {
            const required = {
                shop_name: req.body.shop_name,
                Profile_pic: req.body.Profile_pic
            };
            const nonrequired = {};
            const requestedData = await helper.vaildObject(required, nonrequired);
            const profile = await vendor_store.findOne({ where: { user_id: req.user.id } });

            if (requestedData.shop_name) {
                profile.shop_name = requestedData.shop_name;
            }

            await profile.save();

            if (requestedData.Profile_pic && Array.isArray(requestedData.Profile_pic)) {
                await Vendor_images.destroy({ where: { user_id: profile.id } });

                for (const element of requestedData.Profile_pic) {
                    const profilePic = new Vendor_images();
                    profilePic.user_id = profile.id;
                    profilePic.img_url = element;
                    await profilePic.save();
                }

                return helper.success(res, "Profile edited successfully.");
            } else {
                return helper.error(res, "Invalid profile picture data.");
            }
        } catch (err) {
            return helper.error(res, err);
        }
    },
    getVendorProfile: async (req, res) => {
        try {
            const profile = await vendor_store.findOne({ where: { user_id: req.user.id } });
            const vendorImages = await Vendor_images.findAll({ where: { user_id: profile.id } });
            const response = {
                profile: {
                    id: profile.id,
                    shop_name: profile.shop_name,
                },
                vendorImages: vendorImages.map(image => ({
                    id: image.id,
                    img_url: image.img_url,
                })),
                img_count: vendorImages.length
            };

            return helper.success(res, "Vendor profile retrieved successfully", response);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    DeleteAccount: async (req, res) => {
        try {
            const user = await User.findOne({ where: { id: req.user.id } });
            user.username = 'deleted';
            user.email = 'deleted' + user.id + '@piffpoint.com';
            user.password = "";
            user.is_deleted = 1;
            await user.save();
            return helper.success(res, "User deleted successfully.");
        } catch (err) {
            return helper.error(res, err);
        }
    },

    
}

