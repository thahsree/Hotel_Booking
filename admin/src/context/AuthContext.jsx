import { createContext, useReducer } from "react";
const INITIAL_STATE = {

    admin: null,
    loading:false,
    error:null
}

export const authContext = createContext(INITIAL_STATE);

const authReducer = (state, action)=>{
    switch(action.type){

        case 'LOGIN_START':
            return{
                admin:null,
                loading:true,
                error:null
            }
        case 'LOGIN_SUCCESS':
            return{
                admin:action.payload,
                loading:null,
                error:null
            }
        case 'LOGIN_FAILED':
            return{
                admin:null,
                loading:null,
                error:action.payload
            }
        default:
            return state
            
    }
}

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(authReducer,INITIAL_STATE)


    return(
        <authContext.Provider value={{admin:state.admin ,loading:state.loading ,error:state.error , dispatch}}>
            {children}
        </authContext.Provider>
    )
}

