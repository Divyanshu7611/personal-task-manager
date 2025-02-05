import { User } from "next-auth";
import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"

interface user {
    id: string;
    email: string;
    name: string;
    age: number;
    phone:number;
}

interface AuthStore {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null, token: string | null) => void;
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
                token:localStorage.getItem("token") || null,
                setUser: (user, token) => set({ user, isAuthenticated: !!user, token }),
                setIsAuthenticated:(status) => set({isAuthenticated : status}),
                setLoading:(status) => set({isLoading:status}),
                setError:(error) => set({error}),
                logout: () => {
                    set({ user: null, isAuthenticated: false, token: null });
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.href = "/login";
                  },
            }),
            {
                name:"auth-storage"
            }   
        )
    )
)