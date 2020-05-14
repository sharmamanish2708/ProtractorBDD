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
var userPage_1 = require("../pages/userPage");
var DriverHelper_1 = require("../util/DriverHelper");
var login_1 = require("../pages/login");

var homePage = /** @class */ (function (_super) {
    __extends(homePage, _super);
    function homePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userTab = protractor_1.element(protractor_1.by.css("a[href='/fe/admin/users/all']"));
        _this.roleDropDown = protractor_1.element(protractor_1.by.id("roledropdown"));
        _this.do_Role = protractor_1.element(protractor_1.by.xpath("//a[text()=' DO']"));
        _this.userPageHeader = protractor_1.element(protractor_1.by.css("service-id-title.clearfix>h3"));
        _this.adminTab = protractor_1.element(protractor_1.by.id('admin'));
        _this.categoryTab = protractor_1.element(protractor_1.by.xpath("//a[contains(text(),'Categories')]"));
        _this.categoryTitle = protractor_1.element(protractor_1.by.css("h2[class='title-name']"));
        _this.userProfileDrop = protractor_1.element(protractor_1.by.css(".truncatr-header.nick"));
        _this.logoutBtn = protractor_1.element(protractor_1.by.css(".btn.btn-primary.diconnection-btn"));
        _this.organisationTab = protractor_1.element(protractor_1.by.css("a[href='/fe/admin/administration']"));
        _this.gdpr_tab = protractor_1.element(protractor_1.by.css("a[href='/fe/gdpr/purpose']"));
        _this.datasetsTab = protractor_1.element(protractor_1.by.xpath("//a[@class='show-caret'][contains(text(),'Datasets')]"));
        _this.allDatasets = protractor_1.element(protractor_1.by.xpath("//a[contains(text(),'All Datasets')]"));
        _this.datasetTitle = protractor_1.element(protractor_1.by.xpath("//span[contains(text(),'All Datasets')]"));
        _this.connectorsTab = protractor_1.element(protractor_1.by.xpath("//a[contains(text(),'Connectors')]"));
        _this.ConnectorsDrop = protractor_1.element(protractor_1.by.cssContainingText('a', 'Connectors'));
        _this.AllConnectors = protractor_1.element(protractor_1.by.cssContainingText('a', 'All connectors'));
        _this.ConnectorsTitle = protractor_1.element(protractor_1.by.xpath("//h3[contains(text(),'Connectors')]"));
        _this.mapsTab = protractor_1.element(protractor_1.by.xpath("//a[contains(text(),' Maps ')]"));
        _this.AllMaps = protractor_1.element(protractor_1.by.cssContainingText('a', 'All maps'));
        return _this;
    }
    homePage.prototype.navigateToUsersPage = function () {
        lobj.mousehover(this.adminTab);
        this.userTab.click();
        lobj.waitForPageToLoad();
        return new userPage_1.userPage();
    };
    ;
    homePage.prototype.navigateToPurposePage = function () {
        lobj.mousehover(this.adminTab);
        this.gdpr_tab.click();
        lobj.waitForPageToLoad();
        return new purposePage_1.purposePage();
    };
    ;
    homePage.prototype.navigateAdministration = function () {
        this.adminTab.click();
        lobj.waitForPageToLoad();
    };
    ;
    homePage.prototype.navigateServices = function () {
        lobj.mousehover(this.adminTab);
        this.organisationTab.click();
        lobj.waitForPageToLoad();
        return new servicePage_1.servicePage();
    };
    ;
    homePage.prototype.navigateToCategoryPage = function (title) {
        lobj.waitForPageToLoad();
        lobj.mousehover(this.adminTab);
        this.categoryTab.click();
        lobj.waitForPageToLoad();
        lobj.verifyPageHeader(this.categoryTitle, "Categories");
        return new categoryPage_1.categoryPage();
    };
    ;
    homePage.prototype.navigateTodatasetPage = function (title) {
        lobj.mousehover(this.datasetsTab);
        this.allDatasets.click();
        lobj.waitForPageToLoad();
        lobj.verifyPageHeader(this.datasetTitle, "All Datasets");
        return new datasetPage_1.datasetPage();
    };
    ;
    homePage.prototype.switchToDO = function () {
        this.roleDropDown.click();
        this.do_Role.click();
        return new homePage();
    };
    homePage.prototype.navigateToConnectorPage = function () {
        lobj.mousehover(this.connectorsTab);
        this.AllConnectors.click();
        lobj.waitForPageToLoad();
        // lobj.verifyPageHeader(this.ConnectorsTitle,"Connectors > All connectors")   
        return new ConnectorPage_1.ConnectorPage();
    };
    homePage.prototype.navigateToMapsPage = function () {
        lobj.mousehover(this.mapsTab);
        this.AllMaps.click();
        lobj.waitForPageToLoad();
        return new MapsPage_1.MapsPage();
    };
    homePage.prototype.logout = function () {
        this.userProfileDrop.click();
        this.logoutBtn.click();
        return new login_1.login();
    };
    return homePage;
}(DriverHelper_1.DriverHelper));
exports.homePage = homePage;
var lobj = new homePage();
