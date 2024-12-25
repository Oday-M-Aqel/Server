const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    noOfProducts: {
        type: Number,
        default: 0,
        required: false,
    },
    image: {
        type: Buffer,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

module.exports = category = mongoose.model("categories", categorySchema);
