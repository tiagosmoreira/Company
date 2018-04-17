import React from "react";
import axios from "axios";
import {Dialog, FlatButton, MuiThemeProvider, RaisedButton, TextField} from "material-ui";
import {grey100, blueGrey500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class CreateClient extends React.Component {

    state = {
        open: false,
        client: '',
        name: '',
        representativeEmail: '',
        representativeName: '',
        error: 0,
        errorName: ''
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeName = event => {
        this.setState({name: event.target.value});

    };

    handleChangeRepresentativeName = event => {
        this.setState({representativeName: event.target.value});

    };

    handleChangeRepresentativeEmail = event => {
        this.setState({representativeEmail: event.target.value});

    };

    handleSubmit = event => {
        event.preventDefault(
        );

        this.setState({error : 1});


        const client = {
            name: this.state.name,
            representativeName: this.state.representativeName,
            representativeEmail: this.state.representativeEmail
        };

        axios.post(`http://localhost:8080/clients`, client)
            .then(response => {
                console.log(response);
                this.setState({error : 0});

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
                console.log(err);
            this.setState({errorName : err.response.data[0]});
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
                title={this.state.errorName['Clients']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog
                title={"Client " + this.state.name + " created"}
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
                    <TextField floatingLabelText="Client Name"
                               onChange={this.handleChangeName}/>
                    <TextField floatingLabelText="Representative Name"
                               onChange={this.handleChangeRepresentativeName}/>
                    <TextField floatingLabelText="Representative Email"
                               onChange={this.handleChangeRepresentativeEmail}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Create Client"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }

}
