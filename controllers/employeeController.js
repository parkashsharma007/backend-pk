const Employee = require('../models/employeeModel');

exports.add = async (req, res) => {
    try {
        const data = new Employee(req.body);
        await data.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.all = async (req, res) => {
    try {
        const data = await Employee.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.one = async (req, res) => {
    try {
        const data = await Employee.findById(req.params.id);
        if (!data) return res.status(404).json({ error: "Employee not found" });
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ error: "Employee not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Employee.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Employee not found" });
        res.json({ message: "Employee deleted" });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};
