const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authorization');
const ResponseObject = require('../shared/models/response_object');
const Constant = require('../shared/constant/status_code')
const JobSVC = require('../services/job-services');
router.use('/' , (req , res , next) => {
    const isAuthen = middleware.authorization.checkToken(req);
    isAuthen.then((data) => {
        if(data.result) {
            next()
        } else {
            res.status(Constant.HTTP_STATUS_CODE.UNAUTHORIZED).json(new ResponseObject(Constant.HTTP_STATUS_CODE.UNAUTHORIZED , "Unauthorization"))    
        }
    })
})

router.get('/' , (req , res , next) => {
    JobSVC.jobServices.getAllJob(req , res);
})

module.exports = router;