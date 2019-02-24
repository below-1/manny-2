"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const torm = __importStar(require("typeorm"));
const Transaksi_1 = require("./Transaksi");
const Sesi_1 = require("./Sesi");
const typeorm_1 = require("typeorm");
let PembayaranSesi = class PembayaranSesi extends Transaksi_1.Transaksi {
};
__decorate([
    typeorm_1.Column('int', { nullable: false }),
    __metadata("design:type", Number)
], PembayaranSesi.prototype, "idSesi", void 0);
__decorate([
    typeorm_1.OneToOne(type => Sesi_1.Sesi),
    typeorm_1.JoinColumn({ name: 'idSesi' }),
    __metadata("design:type", Object)
], PembayaranSesi.prototype, "sesi", void 0);
PembayaranSesi = __decorate([
    torm.ChildEntity()
], PembayaranSesi);
exports.PembayaranSesi = PembayaranSesi;
//# sourceMappingURL=PembayaranSesi.js.map