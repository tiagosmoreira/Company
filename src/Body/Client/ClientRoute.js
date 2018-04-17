import React, {Component} from 'react';
import '../../App.css'
import {Route, Switch} from "react-router";
import CreateClient from "./CreateClient";
import UpdateClient from "./UpdateClient";
import GetClient from "./GetClient";
import DeleteClient from "./DeleteClient";

export default class ClientRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/clients/create"} component={CreateClient}/>
                <Route path={"/clients/update"} component={UpdateClient}/>
                <Route path={"/clients/find"} component={GetClient}/>
                <Route path={"/clients/delete"} component={DeleteClient}/>
            </Switch>
        );
    }
}
