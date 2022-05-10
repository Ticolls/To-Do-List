import { ReactNode } from "react"

type ToDoListComponentType = {
    children: ReactNode
}


export function ToDoListComponent(props: ToDoListComponentType) {

    return (
        <div>{props.children}</div>
    )
}