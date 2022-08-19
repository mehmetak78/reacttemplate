// Write "rccp" and hit tab for template

import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import {logoutUser} from "../../store/actions/userActions";
import {withRouter} from "react-router-dom";

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {user} = this.props;
        const isAuthenticated  = user.isAuthenticatied;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/feed">Main</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/main">Item2</Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>

            </ul>
        );

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Sample</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"> </span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profiles"> Item 2</Link>
                                </li>
                            </ul>
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
        //errorReducer: reduxState.errorReducer
    }
}

function mapDispatchToProps() {
    return {logoutUser}
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(Navbar));

