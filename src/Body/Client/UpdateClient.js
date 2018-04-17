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


export default class UpdateClient extends React.Component {

    state = {
        id: 0,
        representativeEmail: '',
        representativeName: '',
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

    handleChangeRepName = event => {
        this.setState({representativeName: event.target.value});
    };

    handleChangeRepEmail = event => {
        this.setState({representativeEmail: event.target.value});
    };

    handleSubmit = event => {

        this.setState({error: 1});

        event.preventDefault();

        axios
            .put(`http://localhost:8080/clients/${this.state.id}`, {
                representativeName: this.state.representativeName,
                representativeEmail: this.state.representativeEmail
            })
            .then(response => {
                console.log(response);

                this.setState({error: 0});

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
                title={this.state.errorName['Clients']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog
                title={"Client updated"}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}> </Dialog>
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                               floatingLabelText="Client Id"
                               onChange={this.handleChangeId}/>
                    <TextField floatingLabelText="New Representative Name"
                               onChange={this.handleChangeRepName}/>
                    <TextField floatingLabelText="New Representative Email"
                               onChange={this.handleChangeRepEmail}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Update Client"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
