import React, {Component} from 'react';
import '../App.css'
import {Link} from "react-router-dom";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import {List, ListItem} from "material-ui/List";
import {MuiThemeProvider} from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme"
import {red600, grey100} from "material-ui/styles/colors"

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: red600,
        accent1Color: grey100
    }
});

export default class Header extends Component {

    constructor() {
        super();
        this.state = {
            drawerOpened: false
        }
    }

    _toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        })
    }

    handleClick() {
        window.location.assign("http://localhost:3000")
    }


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar title={"Mission II"} onTitleClick={this.handleClick}
                            onLeftIconButtonClick={() => this._toggleDrawer()}/>
                    <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={() => this._toggleDrawer()}>
                        <List className={"menu"}>
                            <ListItem>
                                <Link to='/clients'>
                                    <button className={"button"}>Clients</button>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link to='/developers'>
                                    <button className={"button"}>Developers</button>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link to='/projects'>
                                    <button className={"button"}>Projects</button>
                                </Link>
                            </ListItem>
                        </List>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}
