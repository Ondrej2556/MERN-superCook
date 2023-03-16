const mongoose = require('mongoose');

const DB_CONN = process.env.DB_CONN;

const connect = async() => {
    try {
        const db = await mongoose.connect(DB_CONN)
        console.log(`Connected to mongodb: ${db.connection.name}`.underline.cyan)
    } catch (error) {
        console.log("DB error: ",error)
    }
}

module.exports = {connect}