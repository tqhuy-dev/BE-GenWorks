const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  // it("Test sign up customer", done => {
  //   chai
  //     .request(app)
  //     .post("/api/v1/users/")
  //     .send({
  //       email:"test1.developer@gmail.com",
  //       password:"Abc123",
  //       first_name:"Tran",
  //       last_name:"Quoc Huy",
  //       age:23,
  //       birthdate:"842757674",
  //       address:{
  //           city:"Ho Chi Minh",
  //           country:"VietName",
  //           address:"184 Dang Van Ngu Street , Phu Nhuan District"
  //       }
  //     })
  //     .end((err, res) => {
  //       expect(res).to.have.status(201);
  //       expect(res.body.code).to.equals(201);
  //       expect(res.body.message).to.equals("Sign up success");
  //       done();
  //     });
  // });

  it("Test get customer information", done => {
    chai
      .request(app)
      .get("/api/v1/users/tqhuy1996.developer@gmail.com")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.code).to.equal(200)
        done();
      });
  });

  it("Test validate email", done => {
    chai
      .request(app)
      .post("/api/v1/users")
      .send({
        emaild: "test1.developer@gmail.com",
        password: "Abc123",
        first_name: "Tran",
        last_name: "Quoc Huy",
        age: 23,
        birthdate: "842757674",
        address: {
          city: "Ho Chi Minh",
          country: "VietName",
          address: "184 Dang Van Ngu Street , Phu Nhuan District"
        }
      })
      .end((err , res) => {
        expect(res).to.have.status(400);
        expect(res.body.code).to.equal(400);
        done()
      });
  });
});