import React from "react";
import axios from "axios/index";
import {Dialog, FlatButton, MuiThemeProvider, RaisedButton, TextField} from "material-ui";
import DeveloperList from "./DeveloperList";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {blueGrey500, grey100} from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class GetDeveloperProject extends React.Component {

    state = {
        id: 0,
        developers: [],
        error: 0,
        errorName: '',
        open: false,
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeId = event => {
        this.setState({id: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({error: 1});

        axios
            .get(`http://localhost:8080/projects/${this.state.id}/developers`)
            .then(response => {
                console.log(response);

                this.setState({error: 0});

                const AllDevelopers = response.data.map(c => {
                    console.log(c);

                    return {
                        id: c.id,
                        name: c.name,
                        login: c.login,
                        tel: c.tel,
                        email: c.email,
                    };
                });

                const newState = Object.assign({}, this.state, {
                    developers: AllDevelopers
                });
                this.setState(newState);

            }).catch(err => {
                console.log(err);
                this.setState({errorName: err.response.data[0]});
            }
        );
        this.setState({open: true});
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        let dialog;
        if (this.state.error.valueOf() === 1) {
            dialog = <Dialog
                title={this.state.errorName['Projects']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog className={"Dialog"}
                title={"Developers"}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <DeveloperList developers={this.state.developers}/>
            </Dialog>
        }
        return (
            <div className={"divL"}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                               floatingLabelText="Project Id"
                               onChange={this.handleChangeId}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="All Developers"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
