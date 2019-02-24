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
const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;
exports.encodeUser = (user) => {
    let token = jwt.sign({
        id: user.id,
        username: user.username,
        nama: user.nama,
        password: user.password,
        kategori: user.kategori,
        idAdminCabang: user.idAdminCabang
    }, APP_SECRET);
    return token;
};
exports.encodeToken = (repo) => (id) => __awaiter(this, void 0, void 0, function* () {
    let user = yield repo.findOne(id);
    if (!user) {
        throw new Error('Can not find user');
    }
    let token = jwt.sign({
        id: user.id,
        username: user.username,
        nama: user.nama,
        password: user.password,
        kategori: user.kategori,
        idAdminCabang: user.idAdminCabang
    }, APP_SECRET);
    return token;
});
exports.decodeToken = (token) => __awaiter(this, void 0, void 0, function* () {
    if (token) {
        let user;
        try {
            user = jwt.verify(token, APP_SECRET, {
                expiresIn: "30 days"
            });
            return user;
        }
        catch (err) {
            throw new Error("Can't decode token");
        }
    }
});
const authFactory = (repo) => (username, password) => __awaiter(this, void 0, void 0, function* () {
    return yield repo.findOne({
        where: {
            username: username,
            password: password
        }
    });
});
//# sourceMappingURL=auth.js.map