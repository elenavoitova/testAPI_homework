import { Request } from "../framework/request";
import * as user from "../testData/users";
import {path} from "../testData/endpoints";
import * as env from "../testData/env";
import { expect } from "chai";

const BASE_URL = env.local;

beforeEach(function(){
    console.log(`Run time: ${new Date}`);
});

describe("User information checks", function(){

    it("Checking information in user profile", async function(){
        
        
        let login = await new Request(
            `${BASE_URL + path.login}`
            )
            .method(`POST`)
            .body({
                email: user.admin.email,
                password: user.admin.password
            })
            .send();
            

        let userDetails = await new Request(
            `${BASE_URL + path.users}/${user.user_id}`
        )
        .auth(login.body.token)
        .send();

        expect(userDetails.body, JSON.stringify(userDetails.body)).to.be.an("object")
        .that.includes.keys(
            "_id",
            "authenticationMethod",
            "createdAt",
            "emails",
            "profile",
            "services",
            "username"
        );
    });

    it("Checking non-authorize assess to user profile", async function(){
            let userDetails = await new Request(
                `${BASE_URL + path.users}/${user.user_id}`
            )
            .send();
            
            expect(userDetails.body.error, userDetails).to.be.equal('Unauthorized');
            expect(userDetails.body.statusCode, userDetails).to.be.equal(401);

            
    });






});