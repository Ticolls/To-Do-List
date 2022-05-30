import '../styles/home.css'

import { ToDo } from '../components/To-do'
import { Modal } from '../components/Modal'
import { useModal } from '../hooks/useModal'
import { ToDoListComponent } from '../components/To-Do-List'

import { useEffect, useState } from 'react'

import { useDeleted } from '../hooks/useDeleted'
import { api } from '../services/api'

type ToDoType = {
    text: string,
    urgency: string,
    done: boolean,
    _id: string,
    key: string
}

export function Home() {

    const { modalStatus, setModalStatus } = useModal()
    const { deleted } = useDeleted()

    const [toDoList, setToDoList] = useState<ToDoType[]>([])
    const [ordered, SetOrdered] = useState(false)
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if (!ordered) {
            api.get("/to-do/read").then((response) => {
                setToDoList(response.data)
            })
        }

        if (ordered) {
            api.get("/to-do/read/ordered").then((response) => {
                setToDoList(response.data)
            })
        }

    }, [modalStatus, ordered, deleted])


    return (
        <div className="Home">
            <header>
                <h1>TO-DO-LIST</h1>
                <div id="symbol" onClick={() => { SetOrdered(!ordered) }}></div>
            </header>
            <main>

                <div id="main-header">
                    <a onClick={() => { setModalStatus("create") }}>New +</a>
                </div>
                <ToDoListComponent>
                    {toDoList.map(toDo => {
                        return (<ToDo text={toDo.text} urgency={toDo.urgency} done={toDo.done} id={toDo._id} key={toDo._id} />)
                    })}
                </ToDoListComponent>

            </main>


            {modalStatus == "create" || modalStatus == "update" ? <Modal /> : null}

        </div>
    )
}

