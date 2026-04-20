import express from "express";
import Booking from "../models/Booking.js";
import Slot from "../models/Slot.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const { slotId } = req.body;

        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({ error: "Slot not found" });
        }

        if (slot.booked) {
            return res.status(400).json({ error: "Slot already booked" });
        }

        const customer = await User.findById(req.user.userId);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        slot.booked = true;
        await slot.save();

        const booking = await Booking.create({
            slotId: slot._id,
            providerId: slot.providerId,
            customerId: customer._id,
            customerName: customer.name,
        });

        res.status(201).json(booking);
    } catch {
        res.status(500).json({ error: "Booking failed" });
    }
});

export default router;