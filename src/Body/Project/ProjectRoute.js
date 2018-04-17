import React, {Component} from 'react';
import '../../App.css'
import {Route, Switch} from "react-router";
import CreateProject from "./CreateProject";
import UpdateProject from "./UpdateProject"
import DeleteProject from "./DeleteProject";
import GetProject from "./GetProject";
import GetClientProject from "./GetClientProject";
import GetDeveloperProject from "./GetDeveloperProject";
import AddDeveloperProject from "./AddDeveloperProject";
import DeleteDeveloperProject from "./DeleteDeveloperProject";

export default class ProjectRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/projects/create"} component={CreateProject}/>
                <Route path={"/projects/update"} component={UpdateProject}/>
                <Route path={"/projects/find"} component={GetProject}/>
                <Route path={"/projects/delete"} component={DeleteProject}/>
                <Route path={"/projects/clients"} component={GetClientProject}/>
                <Route path={"/projects/developers"} component={GetDeveloperProject}/>
                <Route path={"/projects/developersadd"} component={AddDeveloperProject}/>
                <Route path={"/projects/developersdelete"} component={DeleteDeveloperProject}/>
            </Switch>
        );
    }
}
