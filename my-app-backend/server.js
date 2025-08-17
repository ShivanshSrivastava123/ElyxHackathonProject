const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- INITIAL SETUP ---
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- MONGOOSE SCHEMA (Final, Most Robust Version) ---

const personaSchema = new mongoose.Schema({
  archetype: String, summary: String, goals: [String], challenges: [String],
}, { _id: false });

const kpiSchema = new mongoose.Schema({
  key: String, label: String, value: String, delta: String, hint: String,
}, { _id: false });

const linkSchema = new mongoose.Schema({
  id: String, role: String, timestamp: String, text: String,
}, { _id: false });

const internalMetricSchema = new mongoose.Schema({
  role: String, hours: mongoose.Schema.Types.Mixed,
}, { _id: false });

const eventSchema = new mongoose.Schema({
  id: String, date: String, type: String, title: String, owner: String,
  pillar: String, summary: String, rationale: String,
  links: [linkSchema], internalMetrics: [internalMetricSchema],
}, { _id: false });

const chatSchema = new mongoose.Schema({
  id: String, date: String, role: String, text: String,
}, { _id: false });

const memberSchema = new mongoose.Schema({
  member: { id: String, name: String, persona: personaSchema },
  kpis: [kpiSchema],
  trends: mongoose.Schema.Types.Mixed,
  events: [eventSchema],
  chats: [chatSchema],
  rawPdfText: String,
});

const Member = mongoose.model('Member', memberSchema);

// --- GEMINI LLM SETUP ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

// --- HELPER FUNCTION FOR LLM PROCESSING (Final, Most Robust Prompt) ---
async function processTextWithLLM(text) {
  const prompt = `
    Analyze the chat log from a health concierge service and generate a JSON object for the member profile. Your response MUST be only the raw JSON. The JSON must have these exact top-level keys: "member", "kpis", "trends", "events", "chats".

    1.  **member**: Extract the member's 'name' and create a 'persona' object. The persona must have an 'archetype', a detailed 'summary' of their health situation, an array of 'goals', and an array of 'challenges' based on the text.

    2.  **kpis**: Generate an array of 4 key performance indicator (KPI) objects that best represent the member's journey. Each object must have "key", "label", "value", "delta", and "hint". Choose metrics relevant to the text (e.g., for a tech worker with back pain, use 'Daily Steps'; for a complex medical case, use 'HRV' or 'Readiness Score').

    3.  **trends**: Generate mock data arrays for two relevant metrics (e.g., "hrv" and "rhr") that reflect the member's journey over time.

    4.  **events**: Generate an array of event objects for EACH MONTH mentioned in the document. Each event must have an "id", "date", "type" (e.g., 'decision', 'diagnostic', 'medication', 'test'), "title", "owner", "pillar", a "summary", and a detailed "rationale" explaining why the decision was made.
        - Inside each event, include a "links" array with a relevant chat object ("id", "role", "timestamp", "text").
        - Inside each event, include an "internalMetrics" array with objects for "role" and "hours" worked by the team.

    5.  **chats**: This array must contain only the chat objects that you created inside the "links" array for the events. Ensure the content matches exactly.

    Here is the chat log:
    ---
    ${text}
    ---
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();
    console.log("LLM Raw Response:", jsonText);
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error processing with LLM:', error);
    throw new Error('Failed to process data with the AI model.');
  }
}

// --- API ROUTES ---
app.post('/api/members', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });
  try {
    console.log("Received request. Starting LLM processing...");
    const structuredData = await processTextWithLLM(text);
    console.log("LLM processing finished. Saving to database...");
    structuredData.rawPdfText = text;
    const newMember = new Member(structuredData);
    await newMember.save();
    console.log("Successfully saved new member to database.");
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error in POST /api/members:', error);
    res.status(500).json({ error: 'Failed to create new member.' });
  }
});

app.get('/api/members', async (req, res) => {
  try {
    // This now correctly fetches the entire 'member' sub-document for the sidebar
    const members = await Member.find({}, 'member');
    res.json(members);
  } catch (error) {
    console.error('Error in GET /api/members:', error);
    res.status(500).json({ error: 'Failed to fetch members.' });
  }
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found.' });
    res.json(member);
  } catch (error) {
    console.error(`Error in GET /api/members/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch member data.' });
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
server.timeout = 300000; // 5 minutes