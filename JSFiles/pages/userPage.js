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
var DriverHelper_1 = require("../util/DriverHelper");
var userPage = /** @class */ (function (_super) {
    __extends(userPage, _super);
    function userPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameTextBox = protractor_1.element(protractor_1.by.id('email'));
        _this.dynamicText = protractor_1.element(protractor_1.by.id('pwd'));
        _this.loginButton = protractor_1.element(protractor_1.by.css("button[type='submit']"));
        _this.adminTab = protractor_1.element(protractor_1.by.id('admin'));
        _this.loginError = protractor_1.element(protractor_1.by.css("span[text()='Wrong  username. Try again.']"));
        _this.profileDropDown = protractor_1.element(protractor_1.by.xpath("//a[@class='truncatr-header nick']"));
        _this.logoutBtn = protractor_1.element(protractor_1.by.css("button.btn.btn-primary.diconnection-btn"));
        _this.roleDropDown = protractor_1.element(protractor_1.by.id("roledropdown"));
        _this.do = protractor_1.element(protractor_1.by.xpath("//a[text()=' DO']"));
        _this.addUserBtn = protractor_1.element(protractor_1.by.xpath("//button[text()='Create']"));
        _this.userFormHeader = protractor_1.element(protractor_1.by.css("h4.modal-title"));
        _this.firstname = protractor_1.element(protractor_1.by.id("firstName"));
        _this.lastname = protractor_1.element(protractor_1.by.id("lastName"));
        _this.email = protractor_1.element(protractor_1.by.id("email"));
        _this.servicetypeInt = protractor_1.element(protractor_1.by.id("radio_internal"));
        _this.servicetypePartner = protractor_1.element(protractor_1.by.id("radio_partner"));
        _this.roledo = protractor_1.element(protractor_1.by.id("radio_owner_0"));
        _this.next = protractor_1.element(protractor_1.by.xpath("//button[text()='Next step']"));
        _this.create = protractor_1.element(protractor_1.by.xpath("//input[@id='radio_admin']//following::button[text()='Create']"));
        _this.getEmail = protractor_1.element(protractor_1.by.id('mail'));
        _this.senderEmail = protractor_1.element(protractor_1.by.css("span[class='inboxSenderEmail']"));
        _this.searchField = protractor_1.element(protractor_1.by.css("input[placeholder=' Search a user']"));
        _this.searchIcon = protractor_1.element(protractor_1.by.css(".fa.fa-search"));
        _this.successMessageOnUser = protractor_1.element(protractor_1.by.css("div.col-md-6.col-sm-6>p"));
        _this.okBtn = protractor_1.element(protractor_1.by.xpath("//button[text()='OK']"));
        _this.SearchFld = protractor_1.element(protractor_1.by.id("searchText"));
        _this.searchGlass = protractor_1.element(protractor_1.by.css(".fa.fa-search.search-glass"));
        _this.userFname = protractor_1.element(protractor_1.by.css(".ag-center-cols-container div:nth-child(6) span"));
        _this.firstChkbox = protractor_1.element(protractor_1.by.css(".ag-center-cols-container div:nth-child(4)"));
        _this.deleteBtn = protractor_1.element(protractor_1.by.cssContainingText('button', 'Delete'));
        _this.confirm_Btn = protractor_1.element(protractor_1.by.cssContainingText('button', 'Confirm'));
        _this.deleteConfirmMessage = protractor_1.element(protractor_1.by.css('.msg-width'));
        return _this;
    }
    userPage.prototype.createUser = function (fname, lname, userEmail, serviceType, serviceName, Role) {
        lobj.clearAndFill(this.firstname, fname);
        lobj.clearAndFill(this.lastname, lname);
        lobj.clearAndFill(this.email, userEmail);
        this.next.click();
        this.servicetypeInt.click();
        lobj.selectValueFromDropDown(serviceName);
        this.roledo.click();
        this.create.click();
        var greeting = this.successMessageOnUser.getText();
        expect(greeting).toEqual("The user was successfully created.");
        this.okBtn.click();
        return new userPage();
    };
    userPage.prototype.ClickOnaddUserBtn = function () {
        this.addUserBtn.click();
        lobj.getTextAndcompare(this.userFormHeader, "Add a user");
        return new userPage;
    };
    userPage.prototype.searchUser = function (firstname) {
        lobj.clearAndFill(this.SearchFld, firstname);
        this.searchGlass.click();
        lobj.getTextAndcompare(this.userFname, firstname);
        return this;
    };
    userPage.prototype.deleteUser = function (successMsg) {
        lobj.waitForElementToAppear(this.firstChkbox);
        this.firstChkbox.click();
        lobj.selectValueFromDropDown(" Delete");
        this.confirm_Btn.click();
        lobj.getTextAndcompare(this.deleteConfirmMessage, successMsg);
        this.okBtn.click();
    };
    return userPage;
}(DriverHelper_1.DriverHelper));
exports.userPage = userPage;
var lobj = new userPage();
