import { User } from "next-auth";
import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"

interface user {
    id: string;
    email: string;
    name: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (status: boolean) => void;
    setLoading: (status: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
}


export const useAuthStore =  create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                user:null,
                isAuthenticated:false,
                isLoading:false,
                error:null,
                setUser:(user) => set({user,isAuthenticated:!!user}), 
                setIsAuthenticated:(status) => set({isAuthenticated : status}),
                setLoading:(status) => set({isLoading:status}),
                setError:(error) => set({error}),
                logout:() => set({user:null,isAuthenticated:false})  
            }),
            {
                name:"auth-storage"
            }
        )
    )
)