import { Request } from "../framework/request";
import * as user from "../testData/users";
import {path} from "../testData/endpoints";
import * as env from "../testData/env";
import { expect } from "chai";

const BASE_URL = env.local;

beforeEach(function(){
    console.log(`Run time: ${new Date}`);
});

describe("User list information checks", function(){

    it("Check userlist info", async function(){
        
        
        let login = await new Request(
            `${BASE_URL + path.login}`
            )
            .method(`POST`)
            .body({
                email: user.admin.email,
                password: user.admin.password
            })
            .send();
            

        let userList = await new Request(
            `${BASE_URL + path.users}`
        )
        .auth(login.body.token)
        .send();


    
        expect(userList.body, JSON.stringify(userList.body)).to.be.an('array').to.be.not.empty;
        expect(userList.body, JSON.stringify(userList.body))
        .to.deep.include({_id: user.user_id, username:"t4"});
        
        userList.body.forEach(user => {
            expect(user).to.be.an.instanceof(Object);
            expect(user).to.have.any.keys('_id', 'username');
        });
    });

    it("Checking non-authorize assess to user profile", async function(){
            let userList = await new Request(
                `${BASE_URL + path.users}`
            )
            .send();
            
            expect(userList.body.error, userList).to.be.equal('Unauthorized');
            expect(userList.body.statusCode, userList).to.be.equal(401);

            
    });






});