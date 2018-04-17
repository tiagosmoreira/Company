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

export default class UpdateDeveloper extends React.Component {

    state = {
        id: 0,
        email: '',
        tel: '',
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

    handleChangeEmail = event => {
        this.setState({email: event.target.value});
    };

    handleChangeTel = event => {
        this.setState({tel: event.target.value});
    };

    handleSubmit = event => {

        this.setState({error: 1});

        event.preventDefault();

        axios
            .put(`http://localhost:8080/developers/${this.state.id}`, {
                email: this.state.email,
                tel: this.state.tel
            })
            .then(response => {
                console.log(response);

                this.setState({error: 0});

                console.log(this.state.error);

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
                title={this.state.errorName['Developers']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog
                title={"Developer updated"}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}> </Dialog>
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                        floatingLabelText="Developer Id"
                               onChange={this.handleChangeId}/>
                    <TextField floatingLabelText="New Developer Email"
                               onChange={this.handleChangeEmail}/>
                    <TextField type={"number"}
                               floatingLabelText="New Developer Phone"
                               onChange={this.handleChangeTel}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Edit Developer"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
