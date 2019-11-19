const JobDB = require('../database/jobs-db');
const Constant = require('../shared/constant/status_code');
const ResponseObject = require('../shared/models/response_object');

const jobServices = {
    async getAllJob(req , res) {
        try {
            const data = await JobDB.getAllJobs(req);
            return res.status(Constant.HTTP_STATUS_CODE.OK)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.OK,'All Jobs', data));
        } catch (error) {
            return res.status(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR)
                .json(new ResponseObject(Constant.HTTP_STATUS_CODE.INTERNAL_ERROR, error));
        }
    }
}

module.exports = {
    jobServices: jobServices
}