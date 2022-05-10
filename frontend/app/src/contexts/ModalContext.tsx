import { ReactNode, createContext, useState } from "react";

type ModalContextProviderType = {
    children: ReactNode
}

type ModalContextType = {
    modalStatus: string,
    setModalStatus: (value: React.SetStateAction<string>) => void
}

export const ModalContext = createContext({} as ModalContextType)

export function ModalContextProvider(props: ModalContextProviderType) {

    const [modalStatus, setModalStatus] = useState("closed")

    return (
        <ModalContext.Provider value={{ modalStatus, setModalStatus }}>
            {props.children}
        </ModalContext.Provider>
    )
}