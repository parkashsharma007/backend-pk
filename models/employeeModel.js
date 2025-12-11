const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    empId: String,
    age: Number,
    phone: String,
    email: String,
    department: String,
    position: String,
    salary: Number,
    city: String,
    state: String,
    country: String,
    joiningDate: String,
    gender: String,
    address: String,
    experience: Number
});

module.exports = mongoose.model("Employee", employeeSchema);
