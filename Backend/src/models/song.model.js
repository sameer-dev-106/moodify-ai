const e = require("express");
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true,
        enum: ["Happy", "Sad", "Surprise", "Angry", "Neutral"],
        mongoose: "Enum this is"
    }
},{
    timestamps: true
});

const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;
