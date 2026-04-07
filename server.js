import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();



// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URL || process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URL or MONGO_URI not set in .env file');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI,)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
})
//Model
const Slot = mongoose.model("Slot", {
  time: String,
  rate: Number,
  booked: Boolean,
  name: String,
  userId: String
});

// Routes
app.get("/slots", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    console.error("GET /slots error:", err);
    res.status(500).json({
      error: "Failed to fetch slots",
      details: err.message
    });
  }
});
app.get("/", (req, res) => {
  res.send("DahyTime API is running");
});

app.post('/login', (req, res) => {
  res.json({ _id: "123", name: req.body.name, role: "customer" });
});

app.post('/slots', async (req, res) => {
  try {
    const newSlot = new Slot({
      time: req.body.time,
      rate: req.body.rate,
      booked: false,
      name: "",
      userId: req.body.userId
    });
    
    await newSlot.save();
    res.json(newSlot);
  } catch (err) {
    res.status(500).json({ error: "Failed to add slot" });
  }
});



app.post('/book', async (req, res) => {
  try {
    const slot = await Slot.findById(req.body.slotId);
    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }
    
    slot.booked = true;
    slot.name = req.body.name;
    await slot.save();

    res.json(slot);
  } catch (err) {
    res.status(500).json({ error: "Failed to book slot" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running`);
});
