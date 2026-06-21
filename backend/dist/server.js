"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
console.log("PK:", process.env.CLERK_PUBLISHABLE_KEY);
console.log("SK exists:", !!process.env.CLERK_SECRET_KEY);
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
