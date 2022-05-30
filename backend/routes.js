import Router from 'express'
import { toDoController } from './controllers/toDoController.js'
import { usersController } from './controllers/usersController.js'

const route = Router()

route.get("/", (req, res) => {
    res.send("deu certo!")
})

route.post("/users/create", usersController.create)
route.post("/users/login", usersController.login)

route.get("/to-do/read", toDoController.read)
route.get("/to-do/read/ordered", toDoController.readOrdered)

route.post("/to-do/create", toDoController.create)

route.put("/to-do/check/:id", toDoController.check)
route.put("/to-do/update/:id", toDoController.update)

route.delete("/to-do/delete/:id", toDoController.delete)


export { route }
