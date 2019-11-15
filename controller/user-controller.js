const express = require('express');
const router = express.Router();
const ResponseObject = require('../shared/models/response_object');
const Constant = require('../shared/constant/status_code');
const UserServices = require('../services/user-services');
const middleware = require('../middleware/authorization');
router.post('/login' , UserServices.validate.checkValidateLogin() ,UserServices.userServices.login)

router.post('/' , UserServices.validate.checkValidateSignup() , UserServices.userServices.createUserServices)
//MIDDLEWARE AUTHORIZATION
router.use('/',(req , res , next) => {
    const isAuthen = middleware.authorization.checkToken(req);
    isAuthen.then((data) => {
        if(data) {
            next()
        } else {
            res.status(Constant.HTTP_STATUS_CODE.UNAUTHORIZED).json(new ResponseObject(Constant.HTTP_STATUS_CODE.UNAUTHORIZED , "Unauthorization"))    
        }
    })
})

router.put('/password' , (req , res , next) => {
    res.status(200).json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK , "Change password success"))
})

router.put('/' , (req , res , next) => {
    res.status(200).json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK , "Change success"))
})

router.get('/:email' , (req , res , next) => {
    UserServices.userServices.getCustomerInformation(req , res);
})

router.delete('/' , (req , res , next) => {
    res.status(200).json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK , "Delete success"))
})


module.exports = router;
