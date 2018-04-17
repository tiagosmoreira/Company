import React, {Component} from 'react';
import '../App.css'
import Client from './Client';
import Developer from "./Developer";
import Project from "./Project";
import {Route, Switch} from "react-router";
import HomePage from "./HomePage";

export default class Body extends Component {
    render() {
        return (
            <Switch>
                   <Route path={"/clients"} component={Client}/>
                   <Route path={"/developers"} component={Developer}/>
                   <Route path={"/projects"} component={Project}/>
                   <Route path={""} component={HomePage}/>
            </Switch>
        );
    }
}
