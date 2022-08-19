import React, {Component} from "react"
import {NavLink} from "react-router-dom"
import {getPostMessages} from "../store/actions/sampleActions";
import {connect} from "react-redux";


class SampleMessageList extends Component
{
    onClick = (e) => {
        this.props.getPostMessages();
    };


    render() {
        const {currentUser, messages} = this.props;
        const s = {color: "red"};   // active style

        let messagelist = messages.map((m, index) => (
            <li className="list-group-item" key={index}>
                {m}
            </li>
        ));

        console.log("SampleMessageList props: ");
        console.log(this.props);

        const {error} = this.props;
        return (
            <div>
                <h1>Message List</h1>
                <h4> Hello {currentUser.name}. These are your new messages : </h4>
                <div className="col-sm-12 text-center">
                    <ul className="list-group" id="messages">
                        {messagelist}
                    </ul>
                </div>

                <button className={"btn btn-primary"} onClick={this.onClick}>Get Post Messages</button>
                <NavLink exact activeStyle={s} to="/AddNewMessage"> Add New Message </NavLink>
                {error.message && (
                    <div className="alert alert-danger mt-4 text-center" role="alert"> {error.message}
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        error: reduxState.error
    }
}

function mapDispatchToProps() {
    return {getPostMessages}
}
export default connect(mapStateToProps, mapDispatchToProps())(
    (SampleMessageList)
);

