const express = require('express');
const router = express.Router();
const ResponseObject = require('../shared/models/response_object');
const Constant = require('../shared/constant/status_code');
const UserServices = require('../services/user-services');
router.post('/login' , (req , res , next) => {
    res.status(200).json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK  , "Login success"))
})

router.post('/' , (req , res , next) => {
    UserServices.createUserServices(req , res);
})

router.put('/password' , (req , res , next) => {
    res.status(200).json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK , "Change password success"))
})

router.put('/' , (req , res , next) => {
    res.status(200).json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK , "Change success"))
})

router.get('/:email' , (req , res , next) => {
    UserServices.getCustomerInformation(req , res);
})

router.delete('/' , (req , res , next) => {
    res.status(200).json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK , "Delete success"))
})


module.exports = router;
