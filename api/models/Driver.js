const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    name: String,
    dob: Date,
    phoneNo: Number,
    altPhoneNo: Number,
    email: String,
    address: String,
    aadhaarNo: Number,
    driverLicense: String,
    profileImage: String,
})

const DriverModel = mongoose.model('Driver', driverSchema)

module.exports = DriverModel