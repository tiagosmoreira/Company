import React from "react";
import axios from "axios";
import {blueGrey500, grey100} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {Dialog, FlatButton, MuiThemeProvider, RaisedButton, TextField} from "material-ui";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class CreateDeveloper extends React.Component {

    state = {
        open: false,
        name: '',
        email: '',
        login: '',
        tel: '',
        error: 0,
        errorName:'',
        developer:''
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeName = event => {
        this.setState({name: event.target.value});

    };

    handleChangeLogin = event => {
        this.setState({login: event.target.value});

    };

    handleChangeEmail = event => {
        this.setState({email: event.target.value});

    };

    handleChangeTel = event => {
        this.setState({tel: event.target.value});

    };

    handleSubmit = event => {
        event.preventDefault();

        this.state.error = 1;

        const developer = {
            name: this.state.name,
            login: this.state.login,
            email: this.state.email,
            tel: this.state.tel
        };

        console.log(developer);

        axios.post(`http://localhost:8080/developers`, developer)
            .then(response => {
                console.log(response);

                this.state.error = 0;

                const newDeveloper = {
                    id: response.data.id,
                    name: response.data.name,
                    login: response.data.login,
                    tel: response.data.tel,
                    email: response.data.email
                };

                const newState = Object.assign({}, this.state, {
                    developer: newDeveloper
                });
                this.setState(newState);

            }).catch(err => {
                console.log(err);
                this.setState({errorName: err.response.data[0]});
                console.log(err.response.data);

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
                title={this.state.errorName['Developers']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog
                title={"Developer " + this.state.developer.name + " created"}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <h4>{this.state.developer.name}'s Id: </h4>{this.state.developer.id}
                <h4>{this.state.developer.name}'s Login: </h4>{this.state.developer.login}
                <h4>{this.state.developer.name}'s Email: </h4>{this.state.developer.email}
                <h4>{this.state.developer.name}'s Phone: </h4>{this.state.developer.tel}
            </Dialog>
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField floatingLabelText="Developer Name"
                               onChange={this.handleChangeName}/>
                    <TextField floatingLabelText="Developer Login"
                               onChange={this.handleChangeLogin}/>
                    <TextField floatingLabelText="Developer Email"
                               onChange={this.handleChangeEmail}/>
                    <TextField floatingLabelText="Developer Phone"
                               type={"number"}
                               onChange={this.handleChangeTel}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Create Developer"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
