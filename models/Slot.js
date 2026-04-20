import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
    {
        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        time: { type: Date, required: true },
        duration: { type: Number, default: 60 },
        rate: { type: Number, required: true },
        booked: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("Slot", slotSchema);