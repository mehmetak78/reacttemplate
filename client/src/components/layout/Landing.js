// Write "rccp" and hit tab for template

import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {connect} from "react-redux";


class Landing extends Component {

    componentDidMount() {
        if (this.props.user.isAuthenticatied) {
            this.props.history.push("/samplemessage");
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Sample Application
                                </h1>
                                <p className="lead"> This is a sample application</p>
                                <hr/>
                                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                                <Link to="/login" className="btn btn-lg btn-success">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps())(Landing);

