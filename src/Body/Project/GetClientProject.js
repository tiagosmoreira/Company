import React from "react";
import axios from "axios/index";
import '../../App.css'
import {blueGrey500, grey100} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {Dialog, FlatButton, MuiThemeProvider, RaisedButton, TextField} from "material-ui";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500,
        accent1Color: grey100,
    },
    datePicker: {}
});


export default class GetClientProject extends React.Component {

    state = {
        id: 0,
        error: 0,
        errorName: '',
        client: '',
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
            .get(`http://localhost:8080/projects/${this.state.id}/clients`)
            .then(response => {
                console.log(response);
                this.setState({error: 0});

                const newClient = {
                    id: response.data.id,
                    name: response.data.name,
                    representativeName: response.data.representativeName,
                    representativeEmail: response.data.representativeEmail
                };

                const newState = Object.assign({}, this.state, {
                    client: newClient
                });
                this.setState(newState);

            }).catch(err => {
                console.log(err.response.data);
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
            dialog = <Dialog
                title={"Client " + this.state.client.name}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <h4>{this.state.client.name}'s Id: </h4>{this.state.client.id}
                <h4>{this.state.client.name}'s Representative Name: </h4>{this.state.client.representativeName}
                <h4>{this.state.client.name}'s Representative Email: </h4>{this.state.client.representativeEmail}
            </Dialog>
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                               floatingLabelText="Project Id"
                               onChange={this.handleChangeId}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Get Client"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
