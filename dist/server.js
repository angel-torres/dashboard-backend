"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const auth_1 = __importDefault(require("./routes/auth"));
const sessionConfig_1 = __importDefault(require("./config/sessionConfig"));
const passportConfig_1 = __importDefault(require("./config/passportConfig"));
const logger_1 = __importDefault(require("./middleware/logger"));
const app = express_1.default();
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_session_1.default(sessionConfig_1.default));
app.use(passportConfig_1.default.initialize());
app.use(passportConfig_1.default.session());
app.use(express_1.default.json());
app.use(logger_1.default);
/**
 *
 *  ROUTES
 */
app.use('/auth', auth_1.default);
app.get("/", logger_1.default, (request, response) => {
    console.log("request session count - ", request.session.count = request.session.count + 1 || 1);
    console.log("is authenticated - ", request.isAuthenticated());
    response.send("<h1>WELCOME TO XATCHEL!!!</h1>");
});
exports.default = app;
//# sourceMappingURL=server.js.map