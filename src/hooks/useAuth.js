import { useState, useEffect } from "react"
import { fb } from "../firebase"

export const useAuth = () => {
    const [authUser, setAuthUser] = useState()

    useEffect(() => {
        const unSubscribe = fb.auth.onAuthStateChanged(user => {
            if(user) setAuthUser(user)
            else setAuthUser(null)
        })

        return unSubscribe
    }, [])

    return {
        authUser
    }
}