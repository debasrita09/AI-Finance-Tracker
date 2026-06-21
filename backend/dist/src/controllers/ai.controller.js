"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIInsights = getAIInsights;
const ai_service_1 = require("../services/ai.service");
async function getAIInsights(req, res) {
    try {
        const { transactions } = req.body;
        const insights = await (0, ai_service_1.generateInsights)(transactions);
        res.json({
            insights
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to generate insights"
        });
    }
}
