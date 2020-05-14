import {Given,When,Then} from "cucumber";
import {login} from "../pages/login";
import {browser} from "protractor";
var prop1=require('../testdata/applicationProp')
let lobj=new login();
         

Given(': user is on login page',  function () {
           browser.waitForAngularEnabled(false);
          //Reading Credentials from JSON File
          let url=prop1.credentials.url;
          console.log("url is========================================"+url);
          browser.get(prop1.credentials.url);
         });
   

         When(': user fills the correct username and password and clicks on login button', function () {
            // Write code here that turns the phrase above into concrete actions
            lobj =new login();
            lobj.validateLogin("manish","manish")
            
          });


          Then(': User is succesfully logged in and home page is displayed', function () {
            // Write code here that turns the phrase above into concrete actions
            lobj.validateDashboard();
          });

