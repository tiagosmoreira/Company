import React from "react";
import '../App.css'
import AllClient from "./Client/AllClients";
import {Link} from "react-router-dom";
import ClientRoute from "./Client/ClientRoute";
import {MuiThemeProvider, RaisedButton} from "material-ui";
import {blueGrey500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
    }
});

export default class Client extends React.Component {

    render() {
        return (
            <div className={"clientDiv"}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Link to='/clients/create'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Create Client"
                            primary={true}/>
                    </Link>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Link to='/clients/find'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Find Client"
                            primary={true}/>
                    </Link>
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Link to='/clients/update'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Update Client"
                            primary={true}/>
                    </Link>

                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Link to='/clients/delete'>
                        <RaisedButton
                            className={"CRUDButton"}
                            onClick={this.handleSubmit}
                            label="Delete Client"
                            primary={true}/>
                    </Link>
                </MuiThemeProvider>
                <ClientRoute/>
                < AllClient/>
            </div>
        );
    }
}
