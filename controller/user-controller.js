const express = require('express');
const router = express.Router();
const ResponseObject = require('../shared/models/response_object');
const Constant = require('../shared/constant/status_code');
router.post('/login' , (req , res , next) => {
    res.status(200).json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK  , "Login success"))
})

router.post('/' , (req , res , next) => {
    res.status(201).json(new ResponseObject(Constant.HTTP_STATUS_CODE.CREATED , "Sign up success"))
})

module.exports = router;
