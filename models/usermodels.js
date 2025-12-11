const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: 
    {
         type: String, 
         required: false 
    },
    lastname: 
    {
         type: String,
          required: false 
    },
    age: {
        type: Number,
        required: false
    },
    fathername: {
        type: String,
        required: false
    },
    mothername: {
        type: String,
        required: false
    },
    vilage: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    pincode: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true,
        default: "India"
    },
    dob: {
        type: String, 
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: 
    {
         type: String,
          required: false, 
          unique: true
    },
     
   aadhaarno: {
  type: String,
  default: "",
  unique: true
},

PANno: {
  type: String,
  required: false,
  unique: false
},

    gender: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('User', userSchema);