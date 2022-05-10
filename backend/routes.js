import Router from 'express'
import { toDoController } from './controllers/toDoController.js'

const route = Router()

route.get("/", (req, res) => {
    res.send("deu certo!")
})

route.get("/read", toDoController.read)
route.get("/read/ordered", toDoController.readOrdered)

route.post("/create/to-do", toDoController.create)

route.put("/check/:id", toDoController.check)
route.put("/update/to-do/:id", toDoController.update)

route.delete("/delete/:id", toDoController.delete)


export { route }