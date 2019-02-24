"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const moment_1 = __importDefault(require("moment"));
exports.toDateRange = (time) => {
    let start, end, unit;
    console.log(time);
    switch (time) {
        case types_1.SimpleTime.TODAY:
            unit = 'day';
            break;
        case types_1.SimpleTime.THIS_WEEK:
            unit = 'week';
            break;
        case types_1.SimpleTime.THIS_MONTH:
            unit = 'month';
            break;
        case types_1.SimpleTime.THIS_YEAR:
            unit = 'year';
            break;
        default:
            throw new Error('Simple Time value is not recognized: ' + time);
    }
    start = moment_1.default().startOf(unit).toDate();
    end = moment_1.default().endOf(unit).toDate();
    return { start, end };
};
//# sourceMappingURL=utils.js.map