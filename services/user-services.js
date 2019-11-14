const UserDB = require('../database/user-db');
const Constant = require('../shared/constant/status_code');
const ResponseObject = require('../shared/models/response_object');
const userServices = {
    async createUserServices(req , res) {
        try {
            const result = await UserDB.createAccount(req);
            return res.status(Constant.HTTP_STATUS_CODE.CREATED)
            .json(new ResponseObject(Constant.HTTP_STATUS_CODE.CREATED , "Sign up success" , result));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
            .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR , error));
        }
    },

    async getCustomerInformation(req , res) {
        try {
            const data = await UserDB.getCustomer(req);
            return res.status(Constant.HTTP_STATUS_CODE.OK)
            .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK , "Success" , data));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
            .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR , error));
        }
    }
}

module.exports = userServices