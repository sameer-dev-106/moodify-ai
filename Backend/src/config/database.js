const mongooes = require("mongoose");

function connectToDb() {
    mongooes.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connect to DB");
    });
}

module.exports = connectToDb;