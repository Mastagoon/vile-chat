import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useAuth } from "./hooks/useAuth"
import useResolved from './hooks/useResolved'

import Signup from "./screens/Signup"
import Chat from "./screens/Chat"
import Login from "./screens/Login"

import "./App.css"

const App = () => {
    const history = useHistory()
    const { authUser } = useAuth()
    const authResolved = useResolved(authUser)
    
    // useEffect(() => {
    //     fetch("/api", {
    //         method: "GET",
    //         // headers: {
    //         //     "Content-Type": "Application/json"
    //         // },
    //         // body: JSON.stringify({
    //         //     displayName: "NOOGMAS",
    //         //     userId: "7873o8usmUV53nDhuMLY98g66un2"
    //         // })
    //     }).then(() => {
    //         console.log("done!")
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    //     console.log(authResolved, authUser)
    //     if(authResolved) {
    //         history.push(!!authUser ? "/" : "/login")
    //     }
    // }, [authUser, authResolved, history])

    return (
        <div className="app">
        <Switch>
            <Route path="/" exact component={Chat} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
        </Switch>
        </div>
    )
}

export default App
