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
const User_1 = require("./User");
exports.User = User_1.User;
const Cabang_1 = require("./Cabang");
exports.Cabang = Cabang_1.Cabang;
const Barbermen_1 = require("./Barbermen");
exports.Barbermen = Barbermen_1.Barbermen;
const Picture_1 = require("./Picture");
exports.Picture = Picture_1.Picture;
const Item_1 = require("./Item");
exports.Item = Item_1.Item;
const Jasa_1 = require("./Jasa");
exports.Jasa = Jasa_1.Jasa;
const Sesi_1 = require("./Sesi");
exports.SesiState = Sesi_1.SesiState;
exports.Sesi = Sesi_1.Sesi;
const Media_1 = require("./Media");
exports.Media = Media_1.Media;
const PembayaranSesi_1 = require("./PembayaranSesi");
exports.PembayaranSesi = PembayaranSesi_1.PembayaranSesi;
const Pembelian_1 = require("./Pembelian");
exports.Pembelian = Pembelian_1.Pembelian;
const Penjualan_1 = require("./Penjualan");
exports.Penjualan = Penjualan_1.Penjualan;
const Penggunaan_1 = require("./Penggunaan");
exports.Penggunaan = Penggunaan_1.Penggunaan;
const Transaksi_1 = require("./Transaksi");
exports.Transaksi = Transaksi_1.Transaksi;
const seed_1 = require("./seed");
exports.seed = seed_1.seed;
const typeorm_1 = require("typeorm");
function createDbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbConfig = {
            type: 'mysql',
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT),
            synchronize: process.env.DB_SYNC == 'true',
            logging: process.env.DB_LOG == 'true'
        };
        // const dbConfig = {
        //   host: "localhost",
        //   username: "root",
        //   password: "",
        //   port: 3306,
        //   database: "manliest-db-2",
        //   synchronize: false,
        //   logging: true
        // }
        console.log(dbConfig);
        const entities = [
            Cabang_1.Cabang,
            User_1.User,
            Barbermen_1.Barbermen,
            Jasa_1.Jasa,
            Sesi_1.Sesi,
            Picture_1.Picture,
            Item_1.Item,
            Media_1.Media,
            Pembelian_1.Pembelian,
            Penjualan_1.Penjualan,
            Penggunaan_1.Penggunaan,
            PembayaranSesi_1.PembayaranSesi,
            Transaksi_1.Transaksi
        ];
        const dbConn = yield typeorm_1.createConnection(Object.assign({}, dbConfig, { entities }));
        const cabang = dbConn.getRepository(Cabang_1.Cabang);
        const barbermen = dbConn.getRepository(Barbermen_1.Barbermen);
        return {
            connection: dbConn,
            repo: {
                cabang: (yield dbConn.getRepository(Cabang_1.Cabang)),
                barbermen: (yield dbConn.getRepository(Barbermen_1.Barbermen)),
                jasa: (yield dbConn.getRepository(Jasa_1.Jasa)),
                sesi: (yield dbConn.getRepository(Sesi_1.Sesi)),
                user: (yield dbConn.getRepository(User_1.User)),
                item: (yield dbConn.getRepository(Item_1.Item)),
                pembayaranSesi: (yield dbConn.getRepository(PembayaranSesi_1.PembayaranSesi)),
                pembelian: (yield dbConn.getRepository(Pembelian_1.Pembelian)),
                penjualan: (yield dbConn.getRepository(Penjualan_1.Penjualan)),
                penggunaan: (yield dbConn.getRepository(Penggunaan_1.Penggunaan)),
                transaksi: (yield dbConn.getRepository(Transaksi_1.Transaksi))
            }
        };
    });
}
exports.createDbConnection = createDbConnection;
//# sourceMappingURL=index.js.map