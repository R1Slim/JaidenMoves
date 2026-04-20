import express from "express";
import User from "../models/User.js";
import Slot from "../models/Slot.js";

const router = express.Router();

router.get("/:handle", async (req, res) => {
    try {
        const provider = await User.findOne({
            handle: req.params.handle,
            role: "provider",
        }).select("-password");

        if (!provider) {
            return res.status(404).json({ error: "Provider not found" });
        }

        const slots = await Slot.find({
            providerId: provider._id,
            booked: false,
        }).sort({ time: 1 });

        res.json({ provider, slots });
    } catch {
        res.status(500).json({ error: "Failed to load provider" });
    }
});

export default router;