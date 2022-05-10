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

const model = mongoose.model("ToDoList", toDoListSchema)

export { model }