const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    clientId: String,
    clientName: String,
    vehicleId: String,
    vehicle: String,
    driver: String,
    driverId: String,
    source: String,
    destination: String,
    orderDate: Date,
    sourceArrivalDate: Date,
    loadDate: Date,
    arrivalDate: Date,
    unloadDate: Date,
    freightCharges: Number,
    advanceReceived: Number,
    pay1: Number,
    pay2: Number,
    miscCharges: Number,
    netAmount: Number,
    driverCash: Number,
    fuel: Number,
    fastag: Number,
    remarks: String,  
})

const OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel