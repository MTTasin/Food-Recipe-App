import { createContext } from "react";
import { useState } from "react";

export const RecipeContext = createContext(null)

export default function RecipeState({children}) {

    const [searchParams, setSearchParams] = useState("");


    return (
        <RecipeContext.Provider value={{ searchParams, setSearchParams}}>
            {children}
        </RecipeContext.Provider>
    )
}