import { createContext } from "react"


export const StoreContext = createContext(null)


export default function StoreContextProvider(props)
{
    const url = "http://localhost:500"

    const contextValue = {
        url
    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}
            
        </StoreContext.Provider>

    )
}