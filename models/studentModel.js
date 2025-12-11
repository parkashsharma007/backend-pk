const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:Number,
    roll: Number,
    age: Number,
    class: String,
    section: String,
    fatherName: String,
    motherName: String,
    phone: String,
    email: String,
    city: String,
    state: String,
    country: String,
    address: String,
    dob: String,
    gender: String
});

module.exports = mongoose.model("Student", studentSchema);
