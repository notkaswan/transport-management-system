const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    clientName: String,
    remarks: String,
    phoneNo: Number,
    altPhoneNo: Number,
    email: String,
    address: String,
    gstin: String,
})

const ClientModel = mongoose.model('Client', clientSchema)

module.exports = ClientModel