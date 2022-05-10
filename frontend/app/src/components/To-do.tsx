import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDeleted } from '../hooks/useDeleted';
import { useId } from '../hooks/useId';
import { useModal } from '../hooks/useModal';
import '../styles/toDo.css'

type ToDoPropsType = {
    text: string;
    urgency: string;
    done: boolean,
    id: string,
    key: string
}

export function ToDo(props: ToDoPropsType) {

    const baseURL = "https://todolist-ticolls.herokuapp.com/"

    const [done, setDone] = useState(props.done)
    const { deleted, setDeletedStatus } = useDeleted()
    const { setId } = useId()

    const { setModalStatus } = useModal()

    function handleDoneStatus(e: any) {
        setDone(e.currentTarget.checked)
    }

    useEffect(() => {
        axios.put(baseURL + `check/${props.id}`, { done: done })
    }, [done])

    async function handleDeleteToDo() {
        const r = await axios.delete(baseURL + `delete/${props.id}`)
        setDeletedStatus(!deleted)
    }

    function handleUpdate() {
        setModalStatus("update")
        setId(props.id)
    }


    return (
        <div id="toDo">
            <div id="color" className={props.urgency}></div>

            <div id="main">

                <div id="name">{props.text}</div>

                <div id="buttons">
                    <input type="checkbox" id="checkbox" onChange={handleDoneStatus} checked={done} />
                    <img src="src/assets/align-text-both-one.svg" alt="edit" id="update-button" onClick={() => { handleUpdate() }} />
                    <img src="src/assets/close-one.svg" alt="delete" id="delete-button" onClick={() => { handleDeleteToDo() }} />
                </div>
            </div>
        </div>
    )
}