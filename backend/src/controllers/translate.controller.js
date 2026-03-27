const { TranslationServiceClient } = require("@google-cloud/translate").v3;

const client = new TranslationServiceClient();

exports.translateText = async (req, res) => {
  try {
    const { text, sourceLanguage = "en", targetLanguage = "ar" } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const projectId = await client.getProjectId();

    const request = {
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      mimeType: "text/plain",
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
    };

    const [response] = await client.translateText(request);

    const translatedText = response.translations?.[0]?.translatedText || text;

    return res.status(200).json({
      success: true,
      translated: translatedText,
    });
  } catch (error) {
    console.error("translateText error:", error);
    return res.status(500).json({
      success: false,
      message: "Translation failed",
      error: error.message,
    });
  }
};

exports.translateBatchText = async (req, res) => {
  try {
    const { texts, sourceLanguage = "en", targetLanguage = "ar" } = req.body;

    if (!Array.isArray(texts) || texts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Texts array is required",
      });
    }

    const projectId = await client.getProjectId();

    const request = {
      parent: `projects/${projectId}/locations/global`,
      contents: texts,
      mimeType: "text/plain",
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
    };

    const [response] = await client.translateText(request);

    const translations = response.translations.map((item) => item.translatedText);

    return res.status(200).json({
      success: true,
      translations,
    });
  } catch (error) {
    console.error("translateBatchText error:", error);
    return res.status(500).json({
      success: false,
      message: "Batch translation failed",
      error: error.message,
    });
  }
};