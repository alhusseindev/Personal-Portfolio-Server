const mongoose = require('mongoose');

let inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Name',
        required: true
    },
    phoneNumber: {
        type: Number,
        default: "Phone Number",
        required: true
    },
    email: {
        type: String,
        default: "Email",
        required: true
    },
    message: {
        type: String,
        default: "Message",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

//Let us create a model
const inquiry = mongoose.model('InquiryModel', inquirySchema);

module.exports = inquiry;