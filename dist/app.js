"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load env file
require('dotenv').config();
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const apollo_server_express_1 = require("apollo-server-express");
const models_1 = require("./models");
const resolvers_1 = require("./resolvers");
const routes_1 = require("./routes");
const Admin_1 = require("./services/Admin");
const Owner_1 = require("./services/Owner");
const PORT = process.env.PORT;
// const MODE = process.env.MODE || 'dev'
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const readFile = util.promisify(fs.readFile);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const box = yield models_1.createDbConnection();
        if (process.env.DB_SEED != 'false') {
            yield models_1.seed(box);
        }
        const expressApp = express();
        expressApp.use(cors());
        expressApp.use(fileUpload());
        expressApp.use(express.static('static'));
        yield routes_1.auths({ app: expressApp, repo: box.repo });
        const textGql = (yield readFile('schema.graphql')).toString();
        const schema = apollo_server_express_1.makeExecutableSchema({
            typeDefs: textGql,
            resolvers: resolvers_1.resolvers
        });
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req }) => {
                let user = req.user;
                let authToken = req.authToken;
                console.log('user ', user);
                return {
                    authToken: req.authToken,
                    user: req.user,
                    models: {
                        Admin: Admin_1.generateAdminModel({ user, box, authToken }),
                        Owner: Owner_1.generateOwnerModel(box, user)
                    }
                };
            }
        });
        apolloServer.applyMiddleware({ app: expressApp });
        expressApp.listen({ port: PORT }, () => {
            console.log(`SERVER RUN AT ${PORT}`);
        });
    });
}
start();
//# sourceMappingURL=app.js.map