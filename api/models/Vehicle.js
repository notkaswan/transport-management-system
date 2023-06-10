const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    ownerName: String,
    driverId: String,
    driver: String,
    maker: String,
    model: Number,
    plateNumber: String,
    height: Number,
    capacity: Number,
    noOfTires: Number,
})

const VehicleModel = mongoose.model('Vehicle', vehicleSchema)

module.exports = VehicleModel