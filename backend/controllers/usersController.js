import { usersModel } from '../db/init.js'

const users = {
    user1: {
        id: 0,
        toDos: [{ text: "string", urgency: "string", done: true }, { text: "string", urgency: "string", done: true }]
    },
    user2: {
        id: 1,
        toDos: [{ text: "string", urgency: "string", done: true }, { text: "string", urgency: "string", done: true }, {}, {}]
    },
    user3: {
        id: 2,
        toDos: [{ text: "string", urgency: "string", done: true }, { text: "string", urgency: "string", done: true }, {}, {}]
    },
}

const usersController = {

    async create(req, res) {
        const data = req.body

        const exists = await usersModel.find({ userName: data.userName })

        if (exists.length == 0) {
            const r = await usersModel.create({
                userName: data.userName,
                password: data.password,
                toDoList: []
            })
            res.send("deu certo!")
        } else {
            res.json({ userExists: true })
        }
    },

    async login(req, res) {
        const data = req.body

        const exists = await usersModel.find({ userName: data.userName, password: data.password })

        if (exists.length != 0) {
            res.json({ userExists: true })
        } else {
            res.json({ userExists: false })
        }
    }
}

export { usersController }