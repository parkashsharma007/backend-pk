const express = require('express');
const User = require('../models/usermodels');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "debejhlvwvqqlvgwgqevqchjgdjjtdtvq";

exports.signUp = async (req, res) => {
    try {
        const { firstname, email, phone, password, PANno } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (PANno) {
            const existingPan = await User.findOne({ PANno });
            if (existingPan) {
                return res.status(400).json({ message: "PAN number already exists" });
            }
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const payload = { firstname, email, phone, PANno, password: hash };

        const submituser = new User(payload);
        await submituser.save();
        res.status(201).json({ message: "User created", userId: submituser._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({email }, SECRET_KEY);
        console.log(token);
        res.status(200).json({ message: "Login successful", token, user: { id: user._id, email: user.email, firstname: user.firstname } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.reset = async (req, res) => {
    const { email, oldpassword, newpassword, confrompassword } = req.body;
    if (!(email && oldpassword && newpassword && confrompassword)) {
        return res.status(400).json({ message: "All inputs are required" });
    }

    const users = await User.findOne({ email });
    if (!users) {
        return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(oldpassword, users.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Old password does not match" });
    }

    if (newpassword !== confrompassword) {
        return res.status(400).json({ message: "Confirm password does not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    await User.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });
    return res.status(200).json({ message: "Password reset successful" });
};

exports.forget = async (req, res) => {
    const { email, newpassword, confrompassword } = req.body;
    if (!(email && newpassword && confrompassword)) {
        return res.status(400).json({ message: "All inputs are required" });
    }

    if (newpassword !== confrompassword) {
        return res.status(400).json({ message: "Confirm password does not match" });
    }

    const userdata = await User.findOne({ email });
    if (!userdata) {
        return res.status(400).json({ message: "Please sign up first" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(newpassword, salt);
    await User.findOneAndUpdate({ email }, { $set: { password: hash } });
    return res.status(200).json({ message: "Password updated" });
};