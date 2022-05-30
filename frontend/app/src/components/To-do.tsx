import { useEffect, useState } from 'react';
import { useDeleted } from '../hooks/useDeleted';
import { useId } from '../hooks/useId';
import { useModal } from '../hooks/useModal';
import { api } from '../services/api';
import '../styles/toDo.css'

type ToDoPropsType = {
    text: string;
    urgency: string;
    done: boolean,
    id: string,
    key: string
}

export function ToDo(props: ToDoPropsType) {



    const [done, setDone] = useState(props.done)
    const { deleted, setDeletedStatus } = useDeleted()
    const { setId } = useId()

    const { setModalStatus } = useModal()

    function handleDoneStatus(e: any) {
        setDone(e.currentTarget.checked)
    }

    useEffect(() => {
        api.put(`/to-do/check/${props.id}`, { done: done })
    }, [done])

    async function handleDeleteToDo() {
        const r = await api.delete(`/to-do/delete/${props.id}`)
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

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="update-button" onClick={() => { handleUpdate() }}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.5 3.75C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75H4.5ZM2.25 4.5C2.25 3.25736 3.25736 2.25 4.5 2.25H19.5C20.7426 2.25 21.75 3.25736 21.75 4.5V19.5C21.75 20.7426 20.7426 21.75 19.5 21.75H4.5C3.25736 21.75 2.25 20.7426 2.25 19.5V4.5Z" fill="#1C1B1F" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.25 12C6.25 11.5858 6.58579 11.25 7 11.25H17C17.4142 11.25 17.75 11.5858 17.75 12C17.75 12.4142 17.4142 12.75 17 12.75H7C6.58579 12.75 6.25 12.4142 6.25 12Z" fill="#1C1B1F" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.25 7.5C6.25 7.08579 6.58579 6.75 7 6.75H17C17.4142 6.75 17.75 7.08579 17.75 7.5C17.75 7.91421 17.4142 8.25 17 8.25H7C6.58579 8.25 6.25 7.91421 6.25 7.5Z" fill="#1C1B1F" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.25 16.5C6.25 16.0858 6.58579 15.75 7 15.75H17C17.4142 15.75 17.75 16.0858 17.75 16.5C17.75 16.9142 17.4142 17.25 17 17.25H7C6.58579 17.25 6.25 16.9142 6.25 16.5Z" fill="#1C1B1F" />
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="delete-button" onClick={() => { handleDeleteToDo() }}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89136 2.75 2.75 6.89136 2.75 12C2.75 17.1086 6.89136 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89136 17.1086 2.75 12 2.75Z" fill="#FF0000" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.3588 8.64121C15.6517 8.9341 15.6517 9.40898 15.3588 9.70187L9.70193 15.3587C9.40904 15.6516 8.93416 15.6516 8.64127 15.3587C8.34838 15.0658 8.34838 14.591 8.64127 14.2981L14.2981 8.64121C14.591 8.34832 15.0659 8.34832 15.3588 8.64121Z" fill="#FF0000" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.64127 8.64121C8.93416 8.34832 9.40904 8.34832 9.70193 8.64121L15.3588 14.2981C15.6517 14.591 15.6517 15.0658 15.3588 15.3587C15.0659 15.6516 14.591 15.6516 14.2981 15.3587L8.64127 9.70187C8.34838 9.40898 8.34838 8.9341 8.64127 8.64121Z" fill="#FF0000" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

