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
const Item_1 = require("./Item");
let Pembelian = class Pembelian extends Transaksi_1.Transaksi {
};
__decorate([
    torm.Column(),
    __metadata("design:type", Number)
], Pembelian.prototype, "jumlah", void 0);
__decorate([
    torm.Column({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Pembelian.prototype, "idItem", void 0);
__decorate([
    torm.ManyToOne(type => Item_1.Item, { onDelete: 'CASCADE' }),
    torm.JoinColumn({ name: 'idItem' }),
    __metadata("design:type", Item_1.Item)
], Pembelian.prototype, "item", void 0);
Pembelian = __decorate([
    torm.ChildEntity()
], Pembelian);
exports.Pembelian = Pembelian;
//# sourceMappingURL=Pembelian.js.map