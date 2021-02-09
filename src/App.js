import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useAuth } from "./hooks/useAuth"
import useResolved from './hooks/useResolved'
import { ChatProvider, useChat } from './context/ChatContext'

import Signup from "./screens/Signup"
import Chat from "./screens/Chat"
import Login from "./screens/Login"

import "semantic-ui-css/semantic.min.css"
import "./App.css"
import { Loader } from 'semantic-ui-react'

const App = () => {
    const history = useHistory()
    const { authUser } = useAuth()
    const authResolved = useResolved(authUser)

    
    useEffect(() => {
        if(authResolved) {
            history.push(!!authUser ? "/" : "/login")
        }
        console.log(authResolved)
    }, [authUser, authResolved, history])

    return (
        authResolved ? 
            <ChatProvider authUser={authUser}>
                <div className="app">
                <Switch>
                    <Route path="/" exact component={Chat} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                </Switch>
                </div>
            </ChatProvider>
            : 
            <Loader active size="huge" />
    )
}

export default App
