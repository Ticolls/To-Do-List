import { useEffect, useState } from 'react'
import { useModal } from '../hooks/useModal'
import '../styles/modal.css'

import axios from 'axios'
import { useId } from '../hooks/useId'

export function Modal() {
    const baseURL = "https://todolist-ticolls.herokuapp.com/"

    const createSubmitURL = baseURL + "create/to-do"

    const { modalStatus, setModalStatus } = useModal()
    const { id } = useId()

    const [textFault, setTextFault] = useState(false)
    const [urgencyFault, setUrgencyFault] = useState(false)

    const [text, setText] = useState("")
    const [urgency, setUrgency] = useState("")

    const name = modalStatus


    function getText(e: any) {
        setText(e.currentTarget.value)
    }
    function getUrgency(e: any) {
        setUrgency(e.currentTarget.value)
    }

    useEffect(() => {
        setTextFault(false)
        setUrgencyFault(false)

    }, [setModalStatus])

    async function handleSubmit() {

        if (modalStatus == "create") {
            if (text.trim() != "" && urgency.trim() != "") {

                const res = await axios.post(createSubmitURL, {
                    text: text,
                    urgency: urgency,
                    done: false
                })

            } if (text.trim() == "") {
                setTextFault(true)
                return
            } if (urgency.trim() == "") {
                setUrgencyFault(true)
                return
            }
        }

        if (modalStatus == "update") {
            if (text.trim() != "" || urgency.trim() != "") {

                if (text.trim() != "" && urgency.trim() != "") {
                    const res = await axios.put(`http://localhost:3001/update/to-do/${id}`, { text: text, urgency: urgency })
                } else if (text.trim() != "") {
                    const res = await axios.put(`http://localhost:3001/update/to-do/${id}`, { text: text })
                } else if (urgency.trim() != "") {
                    const res = await axios.put(`http://localhost:3001/update/to-do/${id}`, { urgency: urgency })
                }
            } else {
                setTextFault(true)
                setUrgencyFault(true)
                return
            }

        }

        setModalStatus("closed")
    }

    return (
        <div id="modal">
            <div id="content">
                <form action="#">
                    <div id="text">
                        <label htmlFor="name">To-Do</label>
                        <input type="text" name="name" id="name" maxLength={30} className={textFault ? "textFault" : ""} onChange={getText} />
                    </div>

                    <div id="radios">
                        <div className='radio' id="urgent-block">
                            <label htmlFor="urgency">Urgent</label>
                            <input type="radio" name="urgency" value="urgent" className={urgencyFault ? "urgencyFault" : ""} onChange={getUrgency} id="urgent-input" />
                        </div>

                        <div className='radio' id="medium-block">
                            <label htmlFor="urgency">Medium</label>
                            <input type="radio" name="urgency" value="medium" className={urgencyFault ? "urgencyFault" : ""} onChange={getUrgency} id="medium-input" />
                        </div>

                        <div className="radio" id="light-block">
                            <label htmlFor="urgency">Light</label>
                            <input type="radio" name="urgency" value="light" className={urgencyFault ? "urgencyFault" : ""} onChange={getUrgency} id="light-input" />
                        </div>
                    </div>
                </form>

                <div id="modal-buttons">
                    <button className='modal-button' id="submit" onClick={handleSubmit}>{name}</button>
                    <button className='modal-button' id="cancel" onClick={() => { setModalStatus("closed") }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}