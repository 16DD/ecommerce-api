const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../server");
const shopModel = require("../models/shop.model");
chai.use(chaiHttp);

const endpoint = "http://localhost:3030";
describe("Access route test", () => {
    it("It should access sigin and signout success", async () => {
        //--Cofig
        let API_KEY =
            "f36e90bc2a924558369084cca38cf233b3046bc186217c8f4c0f257b235567e4429b6ac9640a040ab6b397ca7c7e7e19a35d3edc218b9f35fcb938cc4d12262c";
        let access_token;
        let userId;
        //--Sigin
        const shop = {
            email: "darius@gmail.com",
            password: "1234"
        };

        chai.request(endpoint)
            .post("/v1/api/shop/signin")
            .set("x-api-key", API_KEY)
            .send(shop)
            .end((error, res) => {
                //console.log("res:::", res.body);
                res.should.have.status(200);
                res.body.should.have.property("message").eql("Login success");
                access_token = res.body.metadata.tokens.accessToken;
                userId = res.body.metadata.shop._id;
                // console.log("accessToken:::::", access_token);
                // console.log("user:::::", userId);

                //--SignOut;
                chai.request(endpoint)
                    .post("/v1/api/shop/logout")
                    .set("x-api-key", API_KEY)
                    .set("authorization", access_token)
                    .set("x-client-id", userId)
                    .end((error, res) => {
                        //console.log("res:::", res.body);
                        res.should.have.status(200);
                        res.body.should.have.property("message").eql("Logout success");
                    });
            });
    });

    it("Should be request new access token sucess", () => {
        //--Cofig
        let API_KEY =
            "f36e90bc2a924558369084cca38cf233b3046bc186217c8f4c0f257b235567e4429b6ac9640a040ab6b397ca7c7e7e19a35d3edc218b9f35fcb938cc4d12262c";
        let access_token;
        let userId;
        //--Sigin
        const shop = {
            email: "darius@gmail.com",
            password: "1234"
        };

        chai.request(endpoint)
            .post("/v1/api/shop/signin")
            .set("x-api-key", API_KEY)
            .send(shop)
            .end((error, res) => {
                //console.log("res:::", res.body);
                res.should.have.status(200);
                res.body.should.have.property("message").eql("Login success");
                refresh_token = res.body.metadata.tokens.refreshToken;
                userId = res.body.metadata.shop._id;
                // console.log("accessToken:::::", access_token);
                // console.log("user:::::", userId);

                //--SignOut;
                chai.request(endpoint)
                    .post("/v1/api/shop/handleRefreshtoken")
                    .set("x-api-key", API_KEY)
                    .set("x-rtoken-key", refresh_token)
                    .set("x-client-id", userId)
                    .end((error, res) => {
                        // console.log("res:::", res.body);
                        res.should.have.status(200);
                        res.body.should.have.property("message").eql("Refresh token success!");
                    });
            });
    });
});

// beforeEach(async () => {
//     shopModel.remove({}).catch((error) => {
//         console.log("Error:::::", error);
//     });
// });

// afterEach(() => {
//     app.close();
// });
