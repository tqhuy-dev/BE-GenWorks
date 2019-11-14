const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("welcomes user to the api", done => {
    chai
      .request(app)
      .post("/api/v1/users/")
      .send({
        email:"test1.developer@gmail.com",
        password:"Abc123",
        first_name:"Tran",
        last_name:"Quoc Huy",
        age:23,
        birthdate:"842757674",
        address:{
            city:"Ho Chi Minh",
            country:"VietName",
            address:"184 Dang Van Ngu Street , Phu Nhuan District"
        }
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.code).to.equals(201);
        expect(res.body.message).to.equals("Sign up success");
        done();
      });
  });

//   it("adds 2 numbers", done => {
//     chai
//       .request(app)
//       .post("/add")
//       .send({ num1: 5, num2: 5 })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.status).to.equals("success");
//         expect(res.body.result).to.equals(10);
//         done();
//       });
//   });
});