"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loadUtils = /** @class */ (function () {
    function loadUtils() {
    }
    loadUtils.generateRandomString = function (x) {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < x; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    return loadUtils;
}());
exports.loadUtils = loadUtils;
;
