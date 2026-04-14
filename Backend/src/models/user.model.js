const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be Unique"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
}, {
    timestamps: true
});

// TASK 
// userSchema.pre("save", function (next) { })
// userSchema.post("save", function (next) { })

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
