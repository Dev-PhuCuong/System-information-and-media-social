import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with custom user agent and key from env
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables. Real AI answers will be disabled.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const ai = getGeminiClient();

// API endpoint for Theology AI Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, systemInstruction } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    if (!ai) {
      // Fallback response if API key is missing
      return res.json({
        text: "Xin chào! Hiện tại hệ thống đang chạy ở chế độ offline (Thiếu GEMINI_API_KEY). Tôi là Theology AI giả lập, tôi có thể hỗ trợ bạn tìm hiểu về đức tin Công giáo. Hãy cấu hình API Key trong mục Secrets để sử dụng trí tuệ nhân tạo thật sự nhé!"
      });
    }

    // Format messages for the @google/genai SDK
    // The SDK generateContent accepts contents as a string or an array of parts/contents.
    // Let's pass the latest message directly, or include systemInstruction.
    const lastUserMessage = messages[messages.length - 1]?.content || "Xin chào";
    
    // Support basic chat history formatting or context
    const contextPrompt = messages.map((m: any) => `${m.role === 'user' ? 'Người dùng' : 'Theology AI'}: ${m.content}`).join("\n") + "\nTheology AI:";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
      config: {
        systemInstruction: systemInstruction || "Bạn là Theology AI, một người cộng sự thông minh hỗ trợ nghiên cứu giáo lý Công giáo, soạn thảo nội dung truyền thông tôn giáo và tra cứu tài liệu huấn quyền. Hãy luôn trả lời một cách lịch sự, kính trọng, sâu sắc và bằng ngôn ngữ phù hợp (tiếng Việt hoặc tiếng Anh tùy theo câu hỏi của người dùng). Hãy sử dụng Markdown định dạng rõ ràng.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error calling AI model" });
  }
});

// Setup Vite Dev Server / Static Assets Serving
const setupServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

setupServer().catch((err) => {
  console.error("Failed to start server:", err);
});
