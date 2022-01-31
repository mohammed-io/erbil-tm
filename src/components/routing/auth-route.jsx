import { Route, createRoutesFromChildren } from "react-router-dom";

/**
 * @param { import("react-router-dom").PathRouteProps } props
 * @returns  a happy sentence saying hello to the person
 */
export function AuthRoute({ children, ...props }) {
    return (
        <Route {...props} >
            {children}
        </Route>
    )
}

AuthRoute.prototype = Route