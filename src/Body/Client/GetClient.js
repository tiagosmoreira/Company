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

export default class GetClient extends React.Component {

    state = {
        id: 0,
        open: false,
        client: '',
        error: 0,
        errorName: ''
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeId = event => {
        this.setState({id: event.target.value});
    };

    handleSubmit = event => {

        this.setState({error: 1});

        event.preventDefault();

        axios
            .get(`http://localhost:8080/clients/${this.state.id}`)
            .then(response => {
                console.log(response);
                this.setState({error: 0});
                console.log(this.state.error);

                const newClient = {
                    id: response.data.id,
                    name: response.data.name,
                    representativeName: response.data.representativeName,
                    representativeEmail: response.data.representativeEmail
                };

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    client: newClient
                });

                // store the new state object in the component's state
                this.setState(newState);
                console.log(this.state.error);

            }).catch(err => {
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
                title={this.state.errorName['Clients']}
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
                <h4>{this.state.client.name}'s Representative
                    Name: </h4>{this.state.client.representativeName}
                <h4>{this.state.client.name}'s Representative
                    Email: </h4>{this.state.client.representativeEmail}
            </Dialog>
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                               floatingLabelText="Client Id"
                               onChange={this.handleChangeId}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Find Client"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
