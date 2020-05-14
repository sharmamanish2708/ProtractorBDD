"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var json = require('../testdata/prop.json');
var DriverHelper = /** @class */ (function () {
    function DriverHelper() {
    }
    DriverHelper.prototype.clearAndFill = function (element, value) {
        element.clear();
        element.sendKeys(value);
    };
    ;
    DriverHelper.prototype.selectValueFromDropDown = function (optionVal) {
        protractor_1.element.all(protractor_1.by.tagName("option")).each(function (item) {
            item.getText().then(function (value) {
                if (value == optionVal) {
                    item.click();
                }
            });
        });
    };
    DriverHelper.prototype.waitForElementToAppear = function (element) {
        var until = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.wait(until.presenceOf(element), 7000, 'Element taking too long to appear in the DOM');
    };
    DriverHelper.prototype.waitForPageToLoad = function () {
        protractor_1.browser.waitForAngular();
    };
    DriverHelper.prototype.mousehover = function (element) {
        protractor_1.browser.actions().mouseMove(element).perform();
    };
    ;
    DriverHelper.prototype.verifyPageHeader = function (element, pageHeader) {
        var headerName;
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.wait(EC.visibilityOf(element), 17000);
        element.isPresent().then(function (present) {
            if (present) {
                element.getText().then(function (msg) {
                    console.log("before splitting text is" + msg);
                    var header = msg.split('(');
                    headerName = header[0].toString().trim();
                    console.log("txt is " + headerName);
                    expect(headerName).toEqual(pageHeader);
                });
            }
        });
    };
    DriverHelper.prototype.getTextAndcompare = function (element, expctedText) {
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.wait(EC.visibilityOf(element), 17000);
        element.isPresent().then(function (present) {
            if (present) {
                element.getText().then(function (msg) {
                    var innerTxt = msg.toString().trim();
                    console.log("text is" + innerTxt);
                    expect(expctedText).toEqual(innerTxt);
                });
            }
        });
    };
    return DriverHelper;
}());
exports.DriverHelper = DriverHelper;
