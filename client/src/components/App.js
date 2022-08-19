import React, { Component } from 'react';
import '../styles/App.css';

// Redux
import {Provider} from "react-redux";
import {configureStore} from "../store/store";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SampleMessage from "./SampleMessage";
import Login from "./user/Login";
import PrivateRoute from "./common/PrivateRoute";
import {initApp} from "../store/actions/userActions";
import Landing from "./layout/Landing";
import Navbar from "./layout/Navbar";
import SampleAddMessage from "./SampleAddMessage";
import NotFound from "./common/NotFound";

const store = configureStore();


store.dispatch(initApp());

class App extends Component {
  render() {

    return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Route exact path="/" component={Landing} />
                <Switch>
                    <Route  path="/login" component =  {Login}/>
                    <PrivateRoute path="/samplemessage" component={SampleMessage} />
                    <PrivateRoute  path="/AddNewMessage" component =  {SampleAddMessage}/>
                    <Route  path="/notFound" component={NotFound} />
                </Switch>
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
