import { Request } from "../framework/request";
import * as request from "request-promise-native";
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
        
        let userLogin = await new Request(
            `${BASE_URL + path.users}`
            )
            .auth(login.body.token)
            .method(`POST`)
            .body({
                email: "delete1@me.com",
                password: "delete1@me.com",
                username: "deleteMe1"
            })
            .send();
            

        let deleteUser = await request.delete(
            `${BASE_URL + path.users}/${userLogin.body._id}`, {
                auth: {
                    bearer: login.body.token
                }
            }
        )

        let userList = await new Request(
            `${BASE_URL + path.users}`
        )
        .auth(login.body.token)
        .send();
        
        expect(userList.body, JSON.stringify(userList.body))
        .to.not.include({_id: userLogin.body._id, username: "deleteMe1"});

        
    });

  






});