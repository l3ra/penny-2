const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        message: {
            type: String
        },
        sender: {
            type: String
        },
        chatID: {
            type: String
        }
    }
)
let Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat;