import React from "react";
import '../App.css'
import {Link} from "react-router-dom";
import {MuiThemeProvider, RaisedButton} from "material-ui";
import {blueGrey500, grey100} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AllDevelopers from "./Developer/AllDevelopers";
import DeveloperRoute from "./Developer/DeveloperRoute";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class Developer extends React.Component {

    render() {
        return (
            <div className={"clientDiv"}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Link to='/developers/create'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Create Developer"
                            primary={true}/>
                    </Link>

                    <Link to='/developers/find'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Find Developer"
                            primary={true}/>
                    </Link>

                    <Link to='/developers/update'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Update Developer"
                            primary={true}/>
                    </Link>


                    <Link to='/developers/delete'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Delete Developer"
                            primary={true}/>
                    </Link>
                    <DeveloperRoute/>
                    <AllDevelopers/>
                </MuiThemeProvider>
            </div>
        );
    }
}
