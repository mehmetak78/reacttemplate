
import React, {Component} from 'react';
import {connect} from "react-redux"
import {loginUser} from "../../store/actions/userActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: {}
        };
    }


    componentDidMount() {
        if (this.props.user.isAuthenticatied) {
            this.props.history.push("/samplemessage");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.isAuthenticatied) {
            this.props.history.push("/samplemessage");
        }

        /*
        if(nextProps.error) {
            console.log(nextProps.error);
            this.setState({error: nextProps.error});
        }
        */

    }

    onChange =   e =>  {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,

        };
        this.props.loginUser(userData);
    };

    render() {
        console.log("here");
        const {error} = this.props;
        console.log(error);
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup name="email"  type="email" placeholder="Email Address"
                                                error= {error.fields.email}
                                                value={this.state.email} onChange={this.onChange}/>
                                <TextFieldGroup name="password" type="password" placeholder="Passsword"
                                                error={error.fields.password}
                                                value={this.state.password} onChange={this.onChange}/>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                                {error.message && (
                                    <div className="alert alert-danger mt-4 text-center" role="alert"> {error.message +". "+ error.fields.errMsg}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user,
        error: reduxState.error
    }
}

function mapDispatchToProps() {
    return {loginUser}
}

export default connect(mapStateToProps, mapDispatchToProps())(Login);

