const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.PORT);
const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  openaiApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY

};

// Optional safety check
if (!env.mongoUri) {
  throw new Error("MONGO_URI is missing in environment variables");
}

if (!env.openaiApiKey) {
  console.warn("⚠️ OPENAI_API_KEY is not set");
}
if (!env.geminiApiKey) {
    console.warn("⚠️ GEMINI_API_KEY is missing");
  }
  

module.exports = env;
