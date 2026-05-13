const express = require("express");

const router = express.Router();

const generateScript = require("../services/geminiService");

router.post("/generate", async (req, res) => {
  try {
    const { topic, niche, platform, style } = req.body;

    const prompt = `
    Generate a viral short-form reel script.

    Topic: ${topic}
    Niche: ${niche}
    Platform: ${platform}
    Style: ${style}

    Include:
    1. Viral Title
    2. Hook
    3. Full Script
    4. CTA
    5. Hashtags
    `;

    const response = await generateScript(prompt);

    res.json({
      success: true,
      content: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
});

module.exports = router;