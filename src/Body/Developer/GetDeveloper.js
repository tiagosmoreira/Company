import React from "react";
import axios from "axios/index";
import {Dialog, FlatButton, MuiThemeProvider, RaisedButton, TextField} from "material-ui";
import {blueGrey500, grey100} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class GetDeveloper extends React.Component {

    state = {
        id: 0,
        open: false,
        developer: '',
        error: 0,
        errorName: ''
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = event => {

        this.state.error = 1;

        event.preventDefault();

        axios
            .get(`http://localhost:8080/developers/${this.state.id}`)
            .then(response => {
                console.log(response);
                this.state.error = 0;

                const newDevelopers = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    tel: response.data.tel
                };

                console.log(newDevelopers);

                const newState = Object.assign({}, this.state, {
                    developer: newDevelopers
                });

                this.setState(newState);
                console.log(this.state.developer);
            }).catch(err => {
                console.log(err);
            this.setState({errorName: err.response.data[0]});
            }
        );
        this.setState({open: true});
    };

    handleChangeId = event => {
        this.setState({id: event.target.value});
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
                title={this.state.errorName['Developers']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog
                title={"Client " + this.state.developer.name}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <h4>{this.state.developer.name}'s id: </h4>{this.state.developer.id}
                <h4>{this.state.developer.name}'s Login: </h4>{this.state.developer.login}
                <h4>{this.state.developer.name}'s Email: </h4>{this.state.developer.email}
                <h4>{this.state.developer.name}'s Phone: </h4>{this.state.developer.tel}
            </Dialog>
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                               floatingLabelText="Developer id"
                               onChange={this.handleChangeId}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Find Developer"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
