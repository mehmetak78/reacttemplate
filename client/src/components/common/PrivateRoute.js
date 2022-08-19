import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

/*
 1. It has the same API as <Route />
 2. It renders a <Route /> and passes all the props through to it.
 3. It checks if the user is authenticated, if they are, it renders the "component" prop.
    If not, it redirects the user to /login.
*/
const PrivateRoute = ({component: Component, user, ...rest}) => (
    <Route
        {...rest}
        render = {props => {
                return (
                    user.isAuthenticatied ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/login"/>
                    )
                )
            }
        }
    />
);

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
    }
}

function mapDispatchToProps() {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps())(PrivateRoute);


