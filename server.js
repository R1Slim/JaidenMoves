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

mongoose.connect(MONGO_URI,)
  .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1);
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.get('/api/slots', (req, res) => {
  res.json({ message: 'Get slots endpoint' });
});

app.post('/api/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

app.post('/api/slots', (req, res) => {
  res.json({ message: 'Add slot endpoint' });
});

app.post('/api/book', (req, res) => {
  res.json({ message: 'Book slot endpoint' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running`);
});
