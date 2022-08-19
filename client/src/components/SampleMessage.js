import React from "react"

import SampleMessageList from "./SampleMessageList";
import {connect} from "react-redux";

// Functional Stateless Component
const SampleMessage = (props) => {
    const {userName} = props.user;
    const {messages} = props;
    return <div className="container">
        <SampleMessageList
            currentUser = {{name:userName}}
            messages = {messages}
            {...props}
        />
    </div>;
};


const mapStateToProps = (state) => (
    {
        user: state.user,
        messages: state.messages
    }
);

/*
function mapDispatchToProps() {
    return {authUser, removeError}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Main));
*/
export default connect(mapStateToProps, null)(SampleMessage)
