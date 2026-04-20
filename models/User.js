import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["customer", "provider"],
            default: "customer",
        },
        handle: { type: String, unique: true, sparse: true },
        bio: { type: String, default: "" },
        defaultRate: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);