"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const models_1 = require("../models");
const auth_1 = require("./auth");
class AdminModel {
    constructor(box, admin) {
        this.box = box;
        this.admin = admin;
        if (this.admin && (this.admin.kategori == 'admin' || this.admin.kategori == 'owner')) {
            // Do nothing
        }
        else {
            this.admin = null;
        }
    }
    adminLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = yield this.box.repo.user.findOne({
                where: {
                    username,
                    password,
                    kategori: 'admin'
                }
            });
            if (!admin) {
                throw new Error("Can't find admin");
            }
            let token = auth_1.encodeUser(admin);
            return {
                admin,
                token
            };
        });
    }
    newVisit(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(chalk.bgBlue("Admin is "), this.admin)
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            return yield this.box.connection.transaction((em) => __awaiter(this, void 0, void 0, function* () {
                const userRepo = em.getRepository(models_1.User);
                const jasaRepo = em.getRepository(models_1.Jasa);
                const sesiRepo = em.getRepository(models_1.Sesi);
                let newUser = userRepo.create({
                    nama: payload.namaUser,
                    kategori: 'anon'
                });
                newUser = yield userRepo.save(newUser);
                const jasa = yield jasaRepo.findByIds(payload.jasa);
                let totalBayar;
                let waktu = moment_1.default().toDate();
                if (payload.waktu) {
                    waktu = payload.waktu;
                }
                if (payload.totalBayar) {
                    totalBayar = payload.totalBayar;
                }
                else {
                    totalBayar = jasa.map(it => it.harga).reduce((prev, curr) => prev + curr, 0);
                }
                let sesi = sesiRepo.create({
                    keterangan: payload.keterangan,
                    waktu,
                    executionEndTime: waktu,
                    idBarbermen: payload.barbermen,
                    idAddedBy: this.admin.id,
                    state: models_1.SesiState.DONE,
                    idCabang: this.admin.idAdminCabang,
                    idForUser: newUser.id
                });
                sesi = yield sesiRepo.save(sesi);
                let pembayaranSesi = new models_1.PembayaranSesi();
                pembayaranSesi.idCabang = this.admin.idAdminCabang;
                pembayaranSesi.idAddedBy = this.admin.id;
                pembayaranSesi.idSesi = sesi.id;
                pembayaranSesi.waktu = waktu;
                pembayaranSesi.nominal = totalBayar;
                pembayaranSesi.keterangan = payload.keterangan;
                yield em.save(pembayaranSesi);
                return sesi;
            }));
        });
    }
    addItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            let { namaItem } = payload, rest = __rest(payload, ["namaItem"]);
            let item = this.box.repo.item.create(Object.assign({}, rest, { nama: namaItem, idCabang: this.admin.idAdminCabang }));
            return yield this.box.repo.item.save(item);
        });
    }
    removeItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            yield this.box.repo.item.delete(id);
            return id;
        });
    }
    sell(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            return yield this.box.connection.transaction((em) => __awaiter(this, void 0, void 0, function* () {
                const userRepo = em.getRepository(models_1.User);
                const penjualanRepo = em.getRepository(models_1.Penjualan);
                const itemRepo = em.getRepository(models_1.Item);
                let newUser = userRepo.create({
                    nama: payload.namaUser,
                    kategori: 'anon'
                });
                newUser = yield userRepo.save(newUser);
                let waktu, nominal;
                if (payload.waktu) {
                    waktu = payload.waktu;
                }
                else {
                    waktu = moment_1.default().toDate();
                }
                if (payload.nominal) {
                    nominal = payload.nominal;
                }
                else {
                    let item = yield itemRepo.findOne(payload.idItem);
                    nominal = payload.jumlah * item.hargaJual;
                }
                if (payload.jumlah > 0) {
                    payload.jumlah = -1 * payload.jumlah;
                }
                let penjualan = penjualanRepo.create({
                    idAddedBy: this.admin.id,
                    idItem: payload.idItem,
                    jumlah: payload.jumlah,
                    idCabang: this.admin.idAdminCabang,
                    waktu,
                    nominal,
                    keterangan: payload.keterangan
                });
                return yield penjualanRepo.save(penjualan);
            }));
        });
    }
    buy(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            let waktu;
            if (payload.waktu) {
                waktu = payload.waktu;
            }
            else {
                waktu = moment_1.default().toDate();
            }
            if (payload.nominal > 0) {
                payload.nominal = -1 * payload.nominal;
            }
            let pembelian = this.box.repo.pembelian.create(Object.assign({}, payload, { waktu, idAddedBy: this.admin.id, idCabang: this.admin.idAdminCabang }));
            pembelian = yield this.box.repo.pembelian.save(pembelian);
            return pembelian;
        });
    }
    use(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            let waktu;
            if (payload.waktu) {
                waktu = payload.waktu;
            }
            else {
                waktu = moment_1.default().toDate();
            }
            if (payload.jumlah > 0) {
                payload.jumlah = payload.jumlah * -1;
            }
            let penggunaan = this.box.repo.penggunaan.create(Object.assign({}, payload, { waktu, nominal: 0, idAddedBy: this.admin.id, idCabang: this.admin.idAdminCabang }));
            return yield this.box.repo.penggunaan.save(penggunaan);
        });
    }
    transaksi(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            let waktu;
            if (payload.waktu) {
                waktu = payload.waktu;
            }
            else {
                waktu = moment_1.default().toDate();
            }
            let transaksi = this.box.repo.transaksi.create(Object.assign({ idCabang: this.admin.idAdminCabang, idAddedBy: this.admin.id }, payload, { waktu }));
            return yield this.box.repo.transaksi.save(transaksi);
        });
    }
    removeTransaksi(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            yield this.box.repo.transaksi.delete(id);
            return id;
        });
    }
    listSesi() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            let result = yield this.box.repo.sesi.find({
                where: {
                    idCabang: this.admin.idAdminCabang
                },
                relations: [
                    "barbermen", "forUser"
                ]
            });
            let converted = result.map((it) => {
                it.user = it.forUser;
                return it;
            });
            return converted;
        });
    }
    listBarbermen() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            return yield this.box.repo.barbermen.find({
                where: {
                    idCabang: this.admin.idAdminCabang
                }
            });
        });
    }
    listJasa() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            return yield this.box.repo.jasa.find({});
        });
    }
    listItem() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            return yield this.box.repo.item.find({
                where: {
                    idCabang: this.admin.idAdminCabang
                }
            });
        });
    }
    getCabangForAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.admin) {
                throw new Error('Admin is undefined');
            }
            return yield this.box.repo.cabang.findOne(this.admin.idAdminCabang);
        });
    }
}
exports.generateAdminModel = (_a) => {
    var { user, box } = _a, rest = __rest(_a, ["user", "box"]);
    return new AdminModel(box, user);
};
//# sourceMappingURL=Admin.js.map