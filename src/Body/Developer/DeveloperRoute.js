import React, {Component} from 'react';
import '../../App.css'
import {Route, Switch} from "react-router";
import CreateDeveloper from "./CreateDeveloper";
import UpdateDeveloper from "./UpdateDeveloper";
import GetDeveloper from "./GetDeveloper";
import DeleteDeveloper from "./DeleteDeveloper";

export default class DeveloperRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/developers/create"} component={CreateDeveloper}/>
                <Route path={"/developers/update"} component={UpdateDeveloper}/>
                <Route path={"/developers/find"} component={GetDeveloper}/>
                <Route path={"/developers/delete"} component={DeleteDeveloper}/>
            </Switch>
        );
    }
}
