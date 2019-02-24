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
exports.AdminResolver = {
    Query: {
        adminListSesi: (_, __, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.listSesi(); }),
        adminListBarbermen: (_, __, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.listBarbermen(); }),
        adminListJasa: (_, __, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.listJasa(); }),
        adminListItem: (_, __, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.listItem(); })
    },
    Mutation: {
        adminLogin: (_, { username, password }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.adminLogin(username, password); }),
        adminNewVisit: (_, { payload }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.newVisit(payload); }),
        adminAddItem: (_, { payload }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.addItem(payload); }),
        adminRemoveItem: (_, { id }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.removeItem(id); }),
        adminSellItem: (_, { payload }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.sell(payload); }),
        adminBuyItem: (_, { payload }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.buy(payload); }),
        adminUseItem: (_, { payload }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.use(payload); }),
        adminTransaksi: (_, { payload }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.transaksi(payload); }),
        adminRemoveTransaksi: (_, { id }, { models }) => __awaiter(this, void 0, void 0, function* () { return models.Admin.removeTransaksi(id); })
    }
};
//# sourceMappingURL=Admin.js.map