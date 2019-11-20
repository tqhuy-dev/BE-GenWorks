const UserDB = require('../database/user-db');
const Constant = require('../shared/constant/status_code');
const ResponseObject = require('../shared/models/response_object');
const middleware = require('../middleware/authorization');
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
            const checkExistEmail = await UserDB.getCustomer(req.body.email);
            if (checkExistEmail !== null) {
                return res.status(Constant.HTTP_STATUS_CODE.OK)
                    .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Email is already used"));
            } else {
                const result = await UserDB.createAccount(req);
                return res.status(Constant.HTTP_STATUS_CODE.CREATED)
                    .json(new ResponseObject(Constant.HTTP_STATUS_CODE.CREATED, "Sign up success", result));
            }
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },

    async getCustomerInformation(req, res) {
        try {
            const data = await UserDB.getCustomer(req.params.email);
            return res.status(Constant.HTTP_STATUS_CODE.OK)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Success", data));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },

    async getCustomerInformationSession(req, res) {
        try {
            const data = await UserDB.getCustomerBySession(req.params.session);
            if(data === null) {
                return res.status(Constant.HTTP_STATUS_CODE.OK)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Session not found"));
            }
            const dataResponse = {
                customer:{
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    age: data.age,
                    birthdate: data.birthdate,
                    jobs: data.jobs,
                    address: data.address,
                    session: data.session,
                    phone: data.phone
                },
                token: data.token
            }
            return res.status(Constant.HTTP_STATUS_CODE.OK)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Success", dataResponse));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },

    async login(req, res) {
        try {
            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
            if (!errors.isEmpty()) {
                return res.status(Constant.HTTP_STATUS_CODE.BAD_REQUEST)
                    .json(new ResponseObject(Constant.HTTP_STATUS_CODE.BAD_REQUEST, errors.array()));
            }
            const data = await UserDB.login(req);
            if (data === null) {
                return res.status(Constant.HTTP_STATUS_CODE.OK)
                    .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Login fail"));
            }
            const token = sha(data + new Date());
            await UserDB.updateTokenCustomer(token, req.body.email);
            const session = sha(req.body.email + new Date());
            await UserDB.updateSessionCustomer(session, req.body.email);
            const dataCustomer = await UserDB.getCustomer(req.body.email);
            const dataResponse = {
                customer: dataCustomer,
                token: token
            };
            return res.status(Constant.HTTP_STATUS_CODE.OK)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Login success", dataResponse));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },

    async updateInformationCustomer(req, res) {
        try {
            const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
            if (!errors.isEmpty()) {
                return res.status(Constant.HTTP_STATUS_CODE.BAD_REQUEST)
                    .json(new ResponseObject(Constant.HTTP_STATUS_CODE.BAD_REQUEST, errors.array()));
            }
            const dataCustomer = await middleware.authorization.checkTokenDatabase(req);
            await UserDB.updateInformation(req, dataCustomer[0].email)
            // if(req.body.jobs) {
            //    await UserDB.updateAllJobsCustomer(req, dataCustomer[0].email);
            // }
            return res.status(Constant.HTTP_STATUS_CODE.OK)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK, "Change success"));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },
}

const validate = {
    checkValidateSignup() {
        return [
            body('email', 'email is required').exists(),
            body('password', 'password is required').exists(),
            body('first_name', 'first name is required').exists(),
            body('last_name', 'last name is required').exists(),
            body('age', 'age is required').exists().isInt(),
            body('birthdate', 'birthdate is required').exists()
        ]
    },

    checkValidateLogin() {
        return [
            body('email', 'email is required').exists(),
            body('password', 'password is required').exists()
        ]
    },

    checkValidateUpdateCustomer() {
        return [
            // body('age', 'age is integer').isInt(),
            // body('phone' , 'phone is string').isString()
        ]
    }
}

module.exports = {
    userServices: userServices,
    validate: validate
}