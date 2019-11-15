const UserDB = require('../database/user-db');
const Constant = require('../shared/constant/status_code');
const ResponseObject = require('../shared/models/response_object');
const { body, validationResult } = require('express-validator');
const jwtServices = require('../shared/jwt/jwt-services');
const sha = require('sha256');
const userServices = {
    async createUserServices(req, res) {
        try {
            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
            if (!errors.isEmpty()) {
                return res.status(Constant.HTTP_STATUS_CODE.BAD_REQUEST)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.BAD_REQUEST, errors.array()));
            }
            const result = await UserDB.createAccount(req);
            return res.status(Constant.HTTP_STATUS_CODE.CREATED)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.CREATED, "Sign up success", result));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },

    async getCustomerInformation(req, res) {
        try {
            const data = await UserDB.getCustomer(req);
            return res.status(Constant.HTTP_STATUS_CODE.OK)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Success", data));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },

    async login(req , res) {
        try {
            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
            if (!errors.isEmpty()) {
                return res.status(Constant.HTTP_STATUS_CODE.BAD_REQUEST)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.BAD_REQUEST, errors.array()));
            }
            const data = await UserDB.login(req);
            const token = sha(data + new Date());
            const dataResponse = {
                customer : data,
                token: token
            };
            await UserDB.updateTokenCustomer(token , req.body.email);
            return res.status(Constant.HTTP_STATUS_CODE.OK)
            .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Login success", dataResponse));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    }
}

const validate = {
    checkValidateSignup() {
        return [
            body('email', 'email is required').exists(),
            body('password','password is required').exists(),
            body('first_name' , 'first name is required').exists(),
            body('last_name' , 'last name is required').exists(),
            body('age' , 'age is required').exists().isInt(),
            body('birthdate' , 'birthdate is required').exists()
        ]
    },

    checkValidateLogin() {
        return [
            body('email' , 'email is required').exists(),
            body('password' , 'password is required').exists()
        ]
    }
}

module.exports = {
    userServices: userServices,
    validate: validate
}