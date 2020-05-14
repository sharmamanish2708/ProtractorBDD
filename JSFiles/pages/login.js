"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var homePage_1 = require("../pages/homePage");
var DriverHelper_1 = require("../util/DriverHelper");
var prop1 = require('../testdata/applicationProp');
var login = /** @class */ (function (_super) {
    __extends(login, _super);
    function login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.unameTextBox = protractor_1.element(protractor_1.by.id('mat-input-0'));
        _this.passTextBox = protractor_1.element(protractor_1.by.id('pwd'));
        _this.OtpBtn = protractor_1.element(protractor_1.by.xpath("span[text()='Send OTP']"));
        _this.adminTab = protractor_1.element(protractor_1.by.id('admin'));
        _this.welcomeBanner = protractor_1.element(protractor_1.by.xpath("//img[@src='/assets/images/welcome_pic.png']//preceding::div[1]"));
        return _this;
    }
    login.prototype.validateLogin = function (username) {
        lobj.clearAndFill(this.unameTextBox, username);
        this.OtpBtn.click();
        lobj.waitForPageToLoad();
        lobj.waitForPageToLoad();
       
        
        return new homePage_1.homePage();
    };
    login.prototype.validateDashboard = function () {
        
        
        return new homePage_1.homePage();
    };
    return login;
}(DriverHelper_1.DriverHelper));
exports.login = login;
var lobj = new login();
