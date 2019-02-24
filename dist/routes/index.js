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
const services_1 = require("../services");
function auths({ app, repo }) {
    const encodeTokenWithRepo = services_1.encodeToken(repo.user);
    app.use(process.env.GRAPHQL_ENDPOINT, (req, resp, next) => __awaiter(this, void 0, void 0, function* () {
        const token = req.query.authorization || req.headers['authorization'];
        let user = yield services_1.decodeToken(token);
        if (user) {
            req.user = user;
            req.authToken = token;
        }
        next();
    }));
    app.get('/token', (req, resp) => __awaiter(this, void 0, void 0, function* () {
        const id = req.query.id;
        let token = yield encodeTokenWithRepo(id);
        resp.end(token);
    }));
}
exports.auths = auths;
//# sourceMappingURL=index.js.map