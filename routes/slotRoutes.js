import express from "express";
import Slot from "../models/Slot.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const slots = await Slot.find().sort({ time: 1 });
        res.json(slots);
    } catch {
        res.status(500).json({ error: "Failed to fetch slots" });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { time, duration, rate } = req.body;

        if (req.user.role !== "provider") {
            return res.status(403).json({ error: "Only providers can create slots" });
        }

        const slot = await Slot.create({
            providerId: req.user.userId,
            time,
            duration,
            rate,
            booked: false,
        });

        res.status(201).json(slot);
    } catch {
        res.status(500).json({ error: "Failed to create slot" });
    }
});

export default router;