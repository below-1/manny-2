"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
exports.TransaksiResolver = {
    Transaksi: {
        __resolveType(obj, context, info) {
            if (obj instanceof models_1.Pembelian)
                return 'Pembelian';
            if (obj instanceof models_1.Penjualan)
                return 'Penjualan';
            if (obj instanceof models_1.Penggunaan)
                return 'Penggunaan';
            // if (obj instanceof PembayaranSesi) return 'PembayaranSesi'
            return "TransaksiLain";
        }
    }
};
//# sourceMappingURL=Transaksi.js.map