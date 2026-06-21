"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(auth_middleware_1.authMiddleware);
app.use("/transactions", transaction_routes_1.default);
app.use("/ai-insights", ai_routes_1.default);
exports.default = app;
