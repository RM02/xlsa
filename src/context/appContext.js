import { createContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

export const AppContext = createContext({})

export function AuthProvider ({ children }) {

    const API_URL = process.env.API_v1_URL;

    const router = useRouter();
    const currentPath = usePathname();

    const [account, setAccount] = useState(null);
    const [token, setToken] = useState();
    const [pid, setPid] = useState("assadasdads");

    const getUserAccount = async (token, query) => {

        const url = new URL(`${API_URL}/users`)
        url.searchParams.append("search", query)

        const response = await fetch(url, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (response.status == 401 && response.statusText == "Unauthorized") {
            await logout()
        }
        const data = await response.json();
        return data?.results[0]
    }
    const login = async (username, password) => {

        let credential = new FormData()
        credential.append("email", username)
        credential.append("password", password)

        const response = await fetch(`${API_URL}/auth/token/`, {
            method: "POST",
            body: credential
        })

        if (response.status == 200) {
            const data = await response.json();
            let currentUser = {...data, username: username }
            Cookies.set("currentUser", JSON.stringify(currentUser))
            let user = await getUserAccount(data.access, username)
            setAccount(user)
            setToken(data.access)
        }
        return response
    }
    const createUser = async (name, email, password) => {
        let credential = new FormData()
        credential.append("first_name", name)
        credential.append("email", email)
        credential.append("password", password)

        const response = await fetch(`${API_URL}/users/`, {
            method: "POST",
            body: credential
        })
        return response
    }
    const logout = async () => {
        setToken(null)
        setAccount(null)
        Cookies.remove("currentUser")
        router.push("/auth")
    }

    const userPersistence = async () => {
        const cookies = Cookies?.get("currentUser")
        if (cookies) {
            let currentUser = JSON.parse(cookies)
            setToken(currentUser.access)
            let account = await getUserAccount(currentUser.access, currentUser.username)
            setAccount(account)
        }
    }
    
    useEffect(() => {
        currentPath === "/auth" ? null : userPersistence()
    }, [])

    return (
        <AppContext.Provider value={{ login, logout, createUser, account, token, pid, setPid }} className="h-full">
            { children }
        </AppContext.Provider>
    )
}