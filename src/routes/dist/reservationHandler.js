"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var RestaurantPubDataBase_1 = require("../data/database/RestaurantPubDataBase");
var models_1 = require("../data/models");
var variables_1 = require("../core/ImportantVariables/variables");
var express = require("express");
var router = express.Router();
router.post(variables_1.APIURLS.reservation.save, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantPubDb, reqBody, bookTimeReq, bookTime, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                restaurantPubDb = new RestaurantPubDataBase_1.RestaurantPubDb();
                reqBody = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                bookTimeReq = reqBody.bookTime;
                bookTime = new models_1.BookTime(bookTimeReq.minute, bookTimeReq.hour, bookTimeReq.day, bookTimeReq.month, bookTimeReq.year, bookTimeReq.people);
                bookTime.name = bookTimeReq.name;
                return [4 /*yield*/, manageReservation(restaurantPubDb.saveReservationToDB(bookTime, reqBody.name, res, reqBody.email, reqBody.personName, reqBody.surName, reqBody.number))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post(variables_1.APIURLS.reservation["delete"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody, restaurantPubDb, bookTimeReq, bookTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqBody = req.body;
                restaurantPubDb = new RestaurantPubDataBase_1.RestaurantPubDb();
                bookTimeReq = reqBody.bookTime;
                bookTime = new models_1.BookTime(bookTimeReq.minute, bookTimeReq.hour, bookTimeReq.day, bookTimeReq.month, bookTimeReq.year, bookTimeReq.people);
                bookTime.name = bookTimeReq.name;
                return [4 /*yield*/, manageReservation(restaurantPubDb.deleteReservationFromDB(bookTime, reqBody.name, res))
                        .then(function () { return console.log("Success"); })["catch"](function (err) {
                        console.log(err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function manageReservation(arrayAddOrRemove) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, arrayAddOrRemove];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = router;
