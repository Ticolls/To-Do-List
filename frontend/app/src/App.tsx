import './styles/global.css'
import './styles/app.css'
import { ToDo } from './components/To-do'
import { Modal } from './components/Modal'
import { useModal } from './hooks/useModal'
import { ToDoListComponent } from './components/To-Do-List'

import { useEffect, useState } from 'react'

import axios from 'axios'
import { useDeleted } from './hooks/useDeleted'

type ToDoType = {
  text: string,
  urgency: string,
  done: boolean,
  _id: string,
  key: string
}

function App() {

  const baseURL = "https://todolist-ticolls.herokuapp.com/"

  const { modalStatus, setModalStatus } = useModal()
  const { deleted } = useDeleted()

  const [toDoList, setToDoList] = useState<ToDoType[]>([])
  const [ordered, SetOrdered] = useState(false)

  useEffect(() => {
    if (!ordered) {
      axios.get(baseURL + "read").then((response) => {
        setToDoList(response.data)
      })
    }

    if (ordered) {
      axios.get(baseURL + "read/ordered").then((response) => {
        setToDoList(response.data)
      })
    }

  }, [modalStatus, ordered, deleted])


  return (
    <div className="App">
      <header>
        <h1>TO-DO-LIST</h1>
        <div id="symbol" onClick={() => { SetOrdered(!ordered) }}></div>
      </header>
      <main>
        <div id="main-header">
          <a href="#" onClick={() => { setModalStatus("create") }}>New +</a>
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

export default App
