import { useContext } from "react";
import { idContext } from "../contexts/idContext";

export function useId() {
    const value = useContext(idContext)

    return value
}