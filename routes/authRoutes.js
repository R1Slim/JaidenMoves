import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, handle } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        if (role === "provider" && handle) {
            const existingHandle = await User.findOne({ handle });
            if (existingHandle) {
                return res.status(400).json({ error: "Handle already taken" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            handle: role === "provider" ? handle : undefined,
        });

        res.status(201).json({ message: "User created" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const matches = await bcrypt.compare(password, user.password);
        if (!matches) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                handle: user.handle,
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
});

export default router;