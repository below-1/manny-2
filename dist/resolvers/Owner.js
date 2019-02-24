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
exports.OwnerResolver = {
    Query: {
        ownerListCabang: (_, __, { models: { Owner } }) => __awaiter(this, void 0, void 0, function* () { return Owner.listCabang(); }),
        ownerCabangItem: (_, { cabang }, { models: { Owner } }) => __awaiter(this, void 0, void 0, function* () { return Owner.listItemInCabang(cabang); }),
        ownerCabangPemasukan: (_, { cabang, time }, { models: { Owner } }) => __awaiter(this, void 0, void 0, function* () { return Owner.pemasukanInCabang(cabang, time); })
    },
    Mutation: {
        ownerCreateCabang: (_, { payload }, { models: { Owner } }) => __awaiter(this, void 0, void 0, function* () { return Owner.createCabang(payload); }),
        ownerUpdateCabang: (_, { id, payload }, { models: { Owner } }) => __awaiter(this, void 0, void 0, function* () { return Owner.updateCabang(id, payload); }),
        ownerRemoveCabang: (_, { id }, { models: { Owner } }) => __awaiter(this, void 0, void 0, function* () { return Owner.removeCabang(id); }),
        ownerRegisterAdmin: (_, { payload }, { models: { Owner } }) => __awaiter(this, void 0, void 0, function* () { return Owner.registerAdmin(payload); })
    }
};
//# sourceMappingURL=Owner.js.map