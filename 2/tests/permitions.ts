import { Request } from "../framework/request";
import * as cred from "../testData/users";
import * as env from "../testData/env";
import {path} from "../testData/endpoints";
import { expect } from "chai";

const BASE_URL = env.local;

beforeEach(function(){
    console.log(`Run time: ${new Date}`);
});



describe("Permitions checks", function(){

    it("Checking permitions for Admin role", async function(){
        let login = await new Request(
            `${BASE_URL + path.login}`
            )
            .method(`POST`)
            .body({
                email: cred.admin.email,
                password: cred.admin.password
            })
            .send();
            
        
        let userDetails = await new Request(
            `${BASE_URL + path.user}`
        )
        .auth(login.body.token)
        .send();

    
        expect(userDetails.body.isAdmin, userDetails).to.be.equal(true);        
    });

    it("Checking permitions for User role", async function(){
        let login = await new Request(
            `${BASE_URL + path.login}`
            )
            .method(`POST`)
            .body({
                email: cred.admin.email,
                password: cred.admin.password
            })
            .send();
            
        
        let userDetails = await new Request(
            `${BASE_URL + path.user}`
        )
        .method(`POST`)
        .auth(login.body.token)
        .body({
            email: cred.user.email,
            password: cred.user.password
        })
        .send();

        expect(userDetails.body.isAdmin, userDetails).to.be.not.equal(true);
    });






});