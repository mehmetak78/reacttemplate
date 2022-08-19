import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {addSampleMessage} from "../store/actions/sampleActions";
import TextFieldGroup from "./common/TextFieldGroup";
import InputGroup from "./common/InputGroup";
import SelectListGroup from "./common/SelectListGroup";
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import Spinner from "./common/Spinner";

class SampleAddMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            twitter: "",
            facebook: "",
            status:"",
            reply:""
        };
    };

    onChange =   e =>  {
        this.setState({[e.target.name]: e.target.value})
    };

    handleAddSampleMessage = event => {
        event.preventDefault();

        this.props.addSampleMessage(this.state.name+ this.state.email);
        this.setState({ name:"", email:""});
        this.props.history.push("/");
    };

    render() {
        const errorFields = this.props.errorFields;
        // Select options for status
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1>Add New Message</h1>
                        <form onSubmit={this.handleAddSampleMessage}>
                            <TextFieldGroup name="name"  type="text" placeholder="Name"
                                            error= {errorFields.name}
                                            value={this.state.name} onChange={this.onChange}
                            />

                            <TextFieldGroup name="email"  type="email" placeholder="Email Address"
                                            error= {errorFields.email}
                                            value={this.state.email} onChange={this.onChange}
                            />
                            <InputGroup
                                placeholder="Twitter Profile URL"
                                name="twitter"
                                icon="fab fa-twitter"
                                value={this.state.twitter}
                                onChange={this.onChange}
                                error={errorFields.twitter}
                            />

                            <InputGroup
                                placeholder="Facebook Page URL"
                                name="facebook"
                                icon="fab fa-facebook"
                                value={this.state.facebook}
                                onChange={this.onChange}
                                error={errorFields.facebook}
                            />

                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options={options}
                                error={errorFields.status}
                                info="Give us an idea of where you are at in your career"
                            />

                            <TextAreaFieldGroup
                                placeholder="Reply to post"
                                name="text"
                                value={this.state.reply}
                                rows={3}
                                onChange={this.onChange}
                                error={errorFields.reply}
                            />
                            Spinner Test : <Spinner/>
                            <button type = "submit" className="btn btn-success ">
                                Add Message
                            </button>
                        </form>
                        <br/>
                        <Link to="/">Back To Index</Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    return {
        errorFields: reduxState.error.fields
    };
}

export default connect(
    mapStateToProps, {addSampleMessage}
)(SampleAddMessage);

