import { Request, Response }
from "express";

import {
  generateInsights
}
from "../services/ai.service";

export async function getAIInsights(
  req: Request,
  res: Response
) {

  try {

    const {
      transactions
    } = req.body;

    const insights =
      await generateInsights(
        transactions
      );

    res.json({
      insights
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to generate insights"
    });

  }
}