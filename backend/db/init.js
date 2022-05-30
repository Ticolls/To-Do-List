import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => {

})

const toDoListSchema = new mongoose.Schema({
    text: String,
    urgency: String,
    done: Boolean
})

const usersSchema = new mongoose.Schema({
    userName: String,
    password: String,
    toDoList: Array

})

const usersModel = mongoose.model("User", usersSchema)
const toDoListModel = mongoose.model("toDoList", toDoListSchema)

export { usersModel, toDoListModel }