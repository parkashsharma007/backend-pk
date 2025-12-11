const Student = require('../models/studentModel');

exports.add = async (req, res) => {
    try {
        const data = new Student(req.body);
        await data.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.all = async (req, res) => {
    try {
        const data = await Student.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.one = async (req, res) => {
    try {
        const data = await Student.findById(req.params.id);
        if (!data) return res.status(404).json({ error: "Student not found" });
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ error: "Student not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Student not found" });
        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};
