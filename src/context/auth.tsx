import { createContext, ReactNode, useEffect } from "react";
import { api } from "../services/api";

type TSignUp = {
    email: string
    fullName: string
    password: string
}

type ISignIn = {
    email: string
    password: string
}

type AuthContextData = {
    signUp: (props: TSignUp) => Promise<void>;
    signIn: (props: ISignIn) => Promise<void>;
}

type AuthResponse = {
    token: string;
}

export const AuthContext = createContext({} as AuthContextData)



type AuthProvider = {
    children: ReactNode;
}



export function AuthProvider(props: AuthProvider) {

    async function signUp (props: TSignUp) {
  
        const data_user = await api.post<AuthResponse>('/signUp', props)

        const { token } = data_user.data
        
        localStorage.setItem('@TokenDailyAgenda', token)
        api.defaults.headers.common.authorization = `Bearer ${token}`
    }

    async function signIn (props: ISignIn) {
  
        const data_user = await api.post<AuthResponse>('/signIn', props)

        const { token } = data_user.data
        
        localStorage.setItem('@TokenDailyAgenda', token)
        api.defaults.headers.common.authorization = `Bearer ${token}`
    }



    
    return (
        <AuthContext.Provider value={{  signUp, signIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}