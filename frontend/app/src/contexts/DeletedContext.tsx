import { ReactNode, createContext, useState } from "react";

type DeletedContextProviderType = {
    children: ReactNode
}

type DeletedContextType = {
    deleted: boolean,
    setDeletedStatus: (value: React.SetStateAction<boolean>) => void
}

export const DeletedContext = createContext({} as DeletedContextType)

export function DeletedContextProvider(props: DeletedContextProviderType) {

    const [deleted, setDeletedStatus] = useState(false)

    return (
        <DeletedContext.Provider value={{ deleted, setDeletedStatus }}>
            {props.children}
        </DeletedContext.Provider>
    )
}