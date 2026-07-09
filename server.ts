import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Google GenAI SDK initialized successfully.");
  } catch (err) {
    console.error("Error initializing Google GenAI:", err);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not set. AI features will fallback to offline responses.");
}

// In-Memory Database for robustness (pre-populated with beautiful prototype data)
interface MockDb {
  users: any[];
  savedJourneys: any[];
  achievements: any[];
  articles: any[];
  feedbackLogs: any[];
}

const DB_FILE = path.join(process.cwd(), "database.json");

let db: MockDb = {
  users: [
    {
      userId: "user-1",
      email: "barbrah361@gmail.com",
      displayName: "Barbrah Kipruto",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      isVerified: true
    }
  ],
  savedJourneys: [
    {
      id: "j-1",
      userId: "user-1",
      countyId: "mombasa",
      year: 1963,
      savedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      notes: "Reliving Mombasa during the glorious day of Kenyan Independence!"
    },
    {
      id: "j-2",
      userId: "user-1",
      countyId: "nairobi",
      year: 2050,
      savedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      notes: "Exploring the breathtaking vertical algae towers of Solarpunk Nairobi."
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "First Jump",
      description: "Initiated your very first time travel journey into Kenya's past.",
      unlockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      icon: "Plane"
    },
    {
      id: "ach-2",
      title: "Mau Mau Historian",
      description: "Explored the forest struggle in 1952 and read Field Marshal Dedan Kimathi's records.",
      unlockedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
      icon: "BookOpen"
    },
    {
      id: "ach-3",
      title: "Visionary Pioneer",
      description: "Traveled into the speculative solarpunk future of 2050.",
      unlockedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      icon: "Sparkles"
    }
  ],
  articles: [
    {
      id: "art-1",
      title: "The Uganda Railway: The Iron Snake That Crafted a Nation",
      category: "infrastructure",
      content: "The Uganda Railway was named 'The Iron Snake' by the Nandi prophet Kimnyole, who foresaw a black snake crawling through the land devouring everything. Completed in 1901, it cost the British Treasury over £5 million and thousands of human lives, but it laid the physical foundation of modern Kenya, birthing Nairobi from a cold, swampy railhead.",
      yearContext: 1900,
      tags: ["railway", "nairobi", "colonial"]
    },
    {
      id: "art-2",
      title: "The Freedom Songs of the Central Forest",
      category: "culture",
      content: "Deep in the Aberdare and Mount Kenya forests, Mau Mau fighters sustained their spirit through song. They took Christian missionary hymns and re-wrote the lyrics into powerful anthems of land reclaiming, military courage, and unity, coding secret movements inside musical rhythm.",
      yearContext: 1952,
      tags: ["maumau", "resistance", "culture"]
    },
    {
      id: "art-3",
      title: "The Olkaria Steam Revolution: Powering 95% Green Growth",
      category: "nature",
      content: "Deep inside Hell's Gate National Park in Naivasha lies one of the world's greatest renewable energy complexes. Olkaria taps the super-heated geothermal steam of the Great Rift Valley, turning roaring vents into pure electricity that powers over 90% of present-day Kenyan grids, setting a spectacular global benchmark.",
      yearContext: 2026,
      tags: ["greenenergy", "geothermal", "nature"]
    }
  ],
  feedbackLogs: []
};

// Save helper
function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save database.json:", err);
  }
}

// Load database if exists
if (fs.existsSync(DB_FILE)) {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    db = JSON.parse(raw);
    console.log("Loaded existing database.json file with", db.users.length, "users.");
  } catch (err) {
    console.error("Error parsing database.json, starting fresh:", err);
  }
} else {
  saveDb();
}

// --- API ROUTES ---

// 1. AI HISTORIAN ENDPOINT
app.post("/api/chat", async (req, res) => {
  const { message, history, yearContext, countyName, cityName } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const systemPrompt = `You are a legendary, wise, and warm Afro-Futuristic Kenyan AI Historian built for the "World Time Machine – Kenya Edition". 
Your task is to guide travelers through Kenya's historical epochs, political struggles, culture, and visionary futures.
Tone guidelines:
- Premium, highly engaging, elegant, and filled with deep pride for African heritage.
- Speak with warm, elite hospitality.
- Masterfully weave authentic Swahili phrases (e.g., 'Karibu mzalendo!', 'Asante sana', 'Harambee!', 'Habari gani') where appropriate.
- Frame your answers visually, as if paint-brushing the scene for them.

CRITICAL EPOCH CONTEXT FOR THIS RESPONSE:
- Current selected Year of exploration: ${yearContext || 2026}
- Selected County: ${countyName || "Nairobi"}
- Selected City/Town: ${cityName || "Nairobi City"}

Adjust your mindset and knowledge base completely to ${yearContext || 2026}.
- If the year is before 1963, discuss the struggles of colonization, traditional kingdoms, or Mau Mau through a historical or empathetic lens.
- If the year is 1963, speak with the breathtaking, euphoric pride of Independence.
- If the year is speculative future (2050 or 2100), speak as a brilliant future-guide, detailing magnetic levitation, solarpunk glass towers, vertical agriculture, and Mombasa's equatorial space elevator, while explicitly noting these are visionary predictions.

Format your responses with clean, beautifully organized Markdown spacing. Avoid dense walls of text. Be concise but deep.`;

  if (!ai) {
    // Elegant Offline Fallback Response when API Key is missing
    console.log("Using offline historian response fallback...");
    const offlineText = `### Greetings, fellow Time Traveler! 🌍✨

I am currently running in **offline guidance mode** as my cosmic quantum neural link (the API Key) is adjusting in the cockpit. However, my historical archives remain fully active!

At this coordinates in **${countyName || "Kenya"}** during the magnificent year **${yearContext || 2026}**:
* This era is marked by **${yearContext && yearContext >= 2050 ? 'Spectacular Afro-Futuristic AI Predictions' : 'Incredible resilience, cultural heritage, and transformation'}**.
* The people here are pioneering new pathways, from traditional Harambee spirits to advanced digital integrations.

**Ask me anything else!** Once you plug in your Gemini API key in **Settings > Secrets**, I will awaken with full quantum historical reasoning! *Tutajenga nchi pamoja!* (We shall build the nation together!)`;
    return res.json({ text: offlineText });
  }

  try {
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    // Generate response using modern gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { text: `System Guide: ${systemPrompt}\n\nUser Question: ${message}` }
      ],
      config: {
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to generate AI response: " + err.message });
  }
});

// 2. AUTHENTICATION ENDPOINTS
app.post("/api/auth/register", (req, res) => {
  const { email, password, displayName } = req.body;
  if (!email || !password || !displayName) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "User already exists with this email." });
  }

  const newUser = {
    userId: "user-" + Math.random().toString(36).substr(2, 9),
    email: email.toLowerCase(),
    displayName,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName)}`,
    isVerified: false
  };

  db.users.push(newUser);
  saveDb();

  res.json({ success: true, user: newUser });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: "User not found. Please register." });
  }

  res.json({ success: true, user });
});

app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required." });
  res.json({ success: true, message: "A recovery portal link has been generated and simulated to your email inbox." });
});

app.post("/api/auth/verify", (req, res) => {
  const { userId } = req.body;
  const user = db.users.find(u => u.userId === userId);
  if (user) {
    user.isVerified = true;
    saveDb();
    return res.json({ success: true, user });
  }
  res.status(404).json({ error: "User not found." });
});

// 3. USER DASHBOARD & FAVORITES
app.get("/api/user/:userId/saved-journeys", (req, res) => {
  const journeys = db.savedJourneys.filter(j => j.userId === req.params.userId);
  res.json(journeys);
});

app.post("/api/user/saved-journeys", (req, res) => {
  const { userId, countyId, year, notes } = req.body;
  if (!userId || !countyId || !year) {
    return res.status(400).json({ error: "Missing required bookmark fields." });
  }

  const newJourney = {
    id: "j-" + Math.random().toString(36).substr(2, 9),
    userId,
    countyId,
    year: parseInt(year, 10),
    savedAt: new Date().toISOString(),
    notes: notes || ""
  };

  db.savedJourneys.push(newJourney);
  
  // Unlock dynamic achievements
  if (db.savedJourneys.filter(j => j.userId === userId).length >= 5) {
    const hasSovereignArch = db.achievements.find(a => a.id === "ach-gold-traveler");
    if (!hasSovereignArch) {
      db.achievements.push({
        id: "ach-gold-traveler",
        title: "Chronos Sovereign",
        description: "Bookmarked 5 or more distinct historical coordinate nodes.",
        unlockedAt: new Date().toISOString(),
        icon: "Globe"
      });
    }
  }

  saveDb();
  res.json({ success: true, journey: newJourney, achievements: db.achievements });
});

app.delete("/api/user/saved-journeys/:id", (req, res) => {
  db.savedJourneys = db.savedJourneys.filter(j => j.id !== req.params.id);
  saveDb();
  res.json({ success: true });
});

app.get("/api/user/:userId/achievements", (req, res) => {
  res.json(db.achievements);
});

// 4. ADMIN PANEL & CONTENT MANAGE
app.get("/api/admin/articles", (req, res) => {
  res.json(db.articles);
});

app.post("/api/admin/articles", (req, res) => {
  const { title, category, content, yearContext, tags } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ error: "Missing title, category, or content." });
  }

  const newArticle = {
    id: "art-" + Math.random().toString(36).substr(2, 9),
    title,
    category,
    content,
    yearContext: parseInt(yearContext, 10) || 2026,
    tags: tags || []
  };

  db.articles.push(newArticle);
  saveDb();
  res.json({ success: true, article: newArticle });
});

app.delete("/api/admin/articles/:id", (req, res) => {
  db.articles = db.articles.filter(a => a.id !== req.params.id);
  saveDb();
  res.json({ success: true });
});

app.get("/api/admin/users", (req, res) => {
  res.json(db.users);
});

app.get("/api/admin/analytics", (req, res) => {
  const stats = {
    totalUsers: db.users.length,
    totalSavedJourneys: db.savedJourneys.length,
    totalArticles: db.articles.length,
    geothermalRenewableIndex: 94.6, // percentage of green grid
    mostVisitedYear: 1963,
    mostActiveCounty: "Nairobi",
    systemStatus: "OPTIMAL",
    quantumNodeTemp: "32.4°C"
  };
  res.json(stats);
});

// Start Express + Vite Middleware Flow
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted in development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`World Time Machine Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
