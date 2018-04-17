import React from "react";
import {MuiThemeProvider, RaisedButton} from "material-ui";
import Link from "react-router-dom/es/Link";
import ProjectRoute from "./Project/ProjectRoute";
import AllProjects from "./Project/AllProjects";
import {blueGrey500, grey100} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class Client extends React.Component {

    render() {
        return (
            <div className={"clientDiv"}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Link to='/projects/create'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Create Project"
                            primary={true}/>
                    </Link>

                    <Link to='/projects/find'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Find Project"
                            primary={true}/>
                    </Link>

                    <Link to='/projects/update'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Update Project"
                            primary={true}/>
                    </Link>


                    <Link to='/projects/delete'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Delete Project"
                            primary={true}/>
                    </Link>

                    <Link to='/projects/clients'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Client Of Project"
                            primary={true}/>
                    </Link>

                    <Link to='/projects/developers'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="All Developers"
                            primary={true}/>
                    </Link>

                    <Link to='/projects/developersadd'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Add Developer"
                            primary={true}/>
                    </Link>

                    <Link to='/projects/developersdelete'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Remove Developer"
                            primary={true}/>
                    </Link>
                    <ProjectRoute/>
                    <AllProjects/>
                </MuiThemeProvider>
            </div>
        );
    }
}
