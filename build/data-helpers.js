"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// @ts-nocheck
const { declareType, TypedData, Types } = require('ydb-sdk');
class Message extends TypedData {
    static create(strId, text, createdAt, creatorName, creatorIp) {
        return new this({ strId, text, createdAt, creatorName, creatorIp });
    }
    constructor(data) {
        super(data);
    }
}
__decorate([
    declareType(Types.UTF8)
], Message.prototype, "strId", void 0);
__decorate([
    declareType(Types.UTF8)
], Message.prototype, "text", void 0);
__decorate([
    declareType(Types.DATETIME)
], Message.prototype, "createdAt", void 0);
__decorate([
    declareType(Types.UTF8)
], Message.prototype, "creatorName", void 0);
__decorate([
    declareType(Types.UTF8)
], Message.prototype, "creatorIp", void 0);
module.exports = {
    Message
};
// export function getSeriesData() {
//     return Series.asTypedCollection([
//         Series.create(1, "IT Crowd", new Date("2006-02-03"),
//             "The IT Crowd is a British sitcom produced by Channel 4, written by Graham Linehan, produced by " +
//             "Ash Atalla and starring Chris O'Dowd, Richard Ayoade, Katherine Parkinson, and Matt Berry."),
//         Series.create(2, "Silicon Valley",  new Date("2014-04-06"),
//             "Silicon Valley is an American comedy television series created by Mike Judge, John Altschuler and " +
//             "Dave Krinsky. The series focuses on five young men who founded a startup company in Silicon Valley.")
//     ]);
// }
