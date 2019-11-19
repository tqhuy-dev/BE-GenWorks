const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const constant = require('../shared/constant/constant');
const { expect } = chai;
chai.use(chaiHttp);
describe("Jobs API" , () => {
    it("Test get all jobs", done => {
        chai
          .request(app)
          .get('/api/v1/jobs/')
          .set('authorization', constant.TOKEN_TMP)
          .end((err , res) => {
            expect(res).to.have.status(200);
            expect(res.body.code).to.equal(200);
            expect(res.body.message).to.equal("All Jobs");
            expect(res.body.data.length).to.above(0);
            done();
          })
      })
});