const mongoose = require('mongoose');

// Define the schema for the data you'll be storing
const memberSchema = new mongoose.Schema({
  member: { id: String, name: String, residence: String, chronic: String },
  kpis: [{ key: String, label: String, value: String, delta: String, hint: String }],
  trends: {
    hrv: [{ x: Number, y: Number }],
    rhr: [{ x: Number, y: Number }],
  },
  events: [{
    id: String, date: String, type: String, title: String, owner: String,
    pillar: String, summary: String, rationale: String,
    links: [{ id: String, role: String, timestamp: String, text: String }]
  }],
  chats: [{ id: String, date: String, role: String, text: String }],
});

module.exports = mongoose.model('Member', memberSchema);