const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
    }
})

const noteModel = mongoose.model("note", noteSchema) // note => "notes" collection created in database

module.exports = noteModel