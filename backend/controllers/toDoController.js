import { toDoListModel, usersModel } from "../db/init.js"

const toDoController = {
    async create(req, res) {
        const data = req.body
        const userName = req.params.userName

        await toDoListModel.create({
            text: data.text,
            urgency: data.urgency,
            done: data.done
        })

        res.json({ message: "deu certo!" })
    },

    async read(req, res) {
        const toDoList = await toDoListModel.find({})

        res.send(toDoList)
    },

    async readOrdered(req, res) {

        const blueList = await toDoListModel.find({ urgency: "light" })
        const yellowList = await toDoListModel.find({ urgency: "medium" })
        const redList = await toDoListModel.find({ urgency: "urgent" })

        let toDoList = [...redList, ...yellowList, ...blueList]

        res.send(toDoList)
    },

    async update(req, res) {
        const data = req.body
        const id = req.params.id

        await toDoListModel.findOneAndUpdate({ _id: id }, data)

        res.send("foi")
    },

    async check(req, res) {
        const query = { _id: req.params.id }
        await toDoListModel.findOneAndUpdate(query, { done: req.body.done })

        res.send(query)
    },

    async delete(req, res) {
        await toDoListModel.findOneAndDelete({ _id: req.params.id })

        res.send("deletado")
    }

}

export { toDoController }