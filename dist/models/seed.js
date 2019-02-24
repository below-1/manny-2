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
// import  from './models'.
const Jasa_1 = require("./Jasa");
function seed(box) {
    return __awaiter(this, void 0, void 0, function* () {
        const truncate = (name) => __awaiter(this, void 0, void 0, function* () {
            yield box.connection.query(`
      SET FOREIGN_KEY_CHECKS = 0;
      TRUNCATE TABLE ${name};
      SET FOREIGN_KEY_CHECKS = 1;
    `);
        });
        // await truncate('cabang')
        // await truncate('barbermen')
        // await truncate('user')
        // await truncate('transaksi')
        // await truncate('jasa')
        // Create owner
        let owner = box.repo.user.create({
            nama: 'Owner',
            username: 'owner-manliest',
            password: 'owner-manliest',
            kategori: 'owner'
        });
        owner = yield box.repo.user.save(owner);
        // Create cabang
        let kupang = box.repo.cabang.create({
            nama: 'Kupang',
            alamat: 'Kupang'
        });
        let kefa = box.repo.cabang.create({
            nama: 'Kefa',
            alamat: 'Kefa'
        });
        kupang = yield box.repo.cabang.save(kupang);
        kefa = yield box.repo.cabang.save(kefa);
        // Create admin
        let adminKupang = box.repo.user.create({
            nama: 'Admin Kupang',
            username: 'admin-kupang',
            password: 'admin-kupang',
            kategori: 'admin',
            idAdminCabang: kupang.id
        });
        adminKupang = yield box.repo.user.save(adminKupang);
        // Create jasa
        yield box.connection.createQueryBuilder()
            .insert()
            .into(Jasa_1.Jasa)
            .values([
            { nama: 'J1', harga: 50000, id: 1 },
            { nama: 'J2', harga: 55000, id: 2 },
            { nama: 'J3', harga: 100000, id: 3 },
            { nama: 'J4', harga: 75000, id: 4 },
            { nama: 'J5', harga: 85000, id: 5 }
        ])
            .execute();
        // Create Barbermen
        yield box.repo.barbermen.save(box.repo.barbermen.create({
            nama: 'Barbermen 1',
            aktif: true,
            idCabang: kupang.id
        }));
        yield box.repo.barbermen.save(box.repo.barbermen.create({
            nama: 'Barbermen 2',
            aktif: true,
            idCabang: kupang.id
        }));
    });
}
exports.seed = seed;
//# sourceMappingURL=seed.js.map