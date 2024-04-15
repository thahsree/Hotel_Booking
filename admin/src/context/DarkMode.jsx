import { createContext, useReducer } from "react";


const INITIAL_STATE = {
    darkMode: false
}

export const modeContext = createContext(INITIAL_STATE);

const modeReducer = (state, action) => {
    switch (action.type) {
        case "dark":
            return {
                darkMode: true,
                
            }
        case 'light':
            return{
                darkMode:false,
            }
        case 'toggle':
            return{
                darkMode:!state.darkMode
            }
        default:
            return state
    }
}

export const ModeContextProvider = ({children})=>{

    const [state , dispatch] = useReducer(modeReducer , INITIAL_STATE)


    return(
        <modeContext.Provider value={{darkMode : state.darkMode , dispatch}}>
            {children}
        </modeContext.Provider>
    )
}