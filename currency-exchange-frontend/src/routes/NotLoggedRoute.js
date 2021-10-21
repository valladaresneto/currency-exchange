import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const NotLoggedRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default NotLoggedRoute