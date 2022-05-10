import { ReactNode, createContext, useState } from "react";

type idContextProviderType = {
    children: ReactNode
}

type idContextType = {
    id: string,
    setId: (value: React.SetStateAction<string>) => void
}

export const idContext = createContext({} as idContextType)

export function IdContextProvider(props: idContextProviderType) {

    const [id, setId] = useState("")

    return (
        <idContext.Provider value={{ id, setId }}>
            {props.children}
        </idContext.Provider>
    )
}