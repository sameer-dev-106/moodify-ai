const mongooes = require("mongoose");

function connectToDb() {
    mongooes.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connect to DB");
        })
        .catch(err => {
            console.log("Error connecting to DB", err);
        })
}

module.exports = connectToDb;