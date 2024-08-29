import { createContext } from "react"


export const StoreContext = createContext(null)


export default function StoreContextProvider(props)
{
    const url = "https://stock-management-system-backend-zxr5.onrender.com"

    const contextValue = {
        url
    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}
            
        </StoreContext.Provider>

    )
}
