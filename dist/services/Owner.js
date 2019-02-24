"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const utils_1 = require("./utils");
class OwnerModel {
    constructor(box, owner) {
        this.box = box;
        this.owner = owner;
        if (!this.owner || this.owner.kategori != 'owner') {
            this.owner = null;
        }
    }
    createCabang(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.owner) {
                throw new Error("Owner is undefiend");
            }
            let cabang = this.box.repo.cabang.create(Object.assign({}, payload));
            return yield this.box.repo.cabang.save(cabang);
        });
    }
    updateCabang(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.owner) {
                throw new Error("Owner is undefiend");
            }
            let cabang = yield this.box.repo.cabang.findOne(id);
            cabang.nama = payload.nama;
            cabang.alamat = payload.alamat;
            return yield this.box.repo.cabang.save(cabang);
        });
    }
    removeCabang(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.owner) {
                throw new Error("Owner is undefiend");
            }
            yield this.box.repo.cabang.delete(id);
            return id;
        });
    }
    registerAdmin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.owner) {
                throw new Error("Owner is undefiend");
            }
            let user = this.box.repo.user.create({
                nama: payload.nama,
                username: payload.username,
                password: payload.password,
                idAdminCabang: payload.cabang,
                kategori: 'admin'
            });
            return yield this.box.repo.user.save(user);
        });
    }
    listCabang() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.owner) {
                throw new Error("Owner is undefiend");
            }
            return yield this.box.repo.cabang.find();
        });
    }
    listItemInCabang(cabang) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.owner) {
                throw new Error("Owner is undefiend");
            }
            return yield this.box.repo.item.find({
                where: {
                    idCabang: cabang
                }
            });
        });
    }
    pemasukanInCabang(cabang, time) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.owner) {
                throw new Error("Owner is undefiend");
            }
            let { start, end } = utils_1.toDateRange(time);
            let items = yield this.box.repo.transaksi.find({
                where: {
                    idCabang: cabang,
                    nominal: typeorm_1.MoreThan(0),
                    waktu: typeorm_1.Between(start, end)
                }
            });
            let total = items.map(it => it.nominal).reduce((prev, curr) => prev + curr, 0);
            let result = {
                items,
                total
            };
            return result;
        });
    }
}
exports.OwnerModel = OwnerModel;
exports.generateOwnerModel = (box, user) => new OwnerModel(box, user);
//# sourceMappingURL=Owner.js.map