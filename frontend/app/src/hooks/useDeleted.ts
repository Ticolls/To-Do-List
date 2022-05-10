import { useContext } from "react";
import { DeletedContext } from "../contexts/DeletedContext";

export function useDeleted() {
    const value = useContext(DeletedContext)

    return value
}