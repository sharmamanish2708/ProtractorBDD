"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_1 = require("cucumber");
var login_1 = require("../pages/login");
var protractor_1 = require("protractor");
var prop1 = require('../testdata/applicationProp');
var lobj = new login_1.login();
cucumber_1.Given(': user is on login page', async function () {
    protractor_1.browser.waitForAngularEnabled(false);
    //Reading Credentials from JSON File
    var url = prop1.credentials.url;
    await protractor_1.browser.get(prop1.credentials.url);
});
cucumber_1.When(': user fills the correct username and password and clicks on login button', async function () {
    // Write code here that turns the phrase above into concrete actions
    lobj = new login_1.login();
    lobj.validateLogin("test@123");
});
cucumber_1.Then(': User is succesfully logged in and home page is displayed', function () {
    // Write code here that turns the phrase above into concrete actions
    lobj.validateDashboard();
});
