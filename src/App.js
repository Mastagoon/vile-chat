import React, { useEffect } from 'react'
import { fb } from "./firebase"
import { Route, Switch } from 'react-router-dom'

import Signup from "./screens/Signup"
import Chat from "./screens/Chat"
import Login from "./screens/Login"

import "./App.css"

const App = () => {
    
    useEffect(() => {
        
    }, [])

    return (
        <Switch>
            <Route path="/" exact component={Chat} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
        </Switch>
    )
}

export default App
