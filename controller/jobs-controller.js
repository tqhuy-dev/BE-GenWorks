const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authorization');
const ResponseObject = require('../shared/models/response_object');
const Constant = require('../shared/constant/status_code')
router.use('/' , (req , res , next) => {
    const isAuthen = middleware.authorization.checkToken(req);
    isAuthen.then((data) => {
        if(data) {
            next()
        } else {
            res.status(Constant.HTTP_STATUS_CODE.UNAUTHORIZED).json(new ResponseObject(Constant.HTTP_STATUS_CODE.UNAUTHORIZED , "Unauthorization"))    
        }
    })
})

router.get('/' , (req , res , next) => {
    res.status(200).json({
        status: 200
    })
})

module.exports = router;