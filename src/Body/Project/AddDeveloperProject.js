import React from "react";
import axios from "axios"
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

export default class AddDeveloperProject extends React.Component {

    state = {
        idProject: 0,
        idDeveloper: 0,
        error: 0,
        data: '',
        errorName: '',
        open: false,
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeIdProject = event => {
        this.setState({idProject: event.target.value});

    };

    handleChangeIdDeveloper = event => {
        this.setState({idDeveloper: event.target.value});

    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({error: 1});

        axios.put(`http://localhost:8080/projects/${this.state.idProject}/${this.state.idDeveloper}`)
            .then(response => {
                console.log(response);
                this.setState({error: 0});

                const newProject = {
                    nameProject: response.data.name,
                };

                const newState = Object.assign({}, this.state, {
                    data: newProject
                });
                this.setState(newState);

            }).catch(err => {
                console.log(err);
                this.setState({errorName: err.response.data[0]});

                console.log(err.response);
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
                title={"Developer with id " + this.state.idDeveloper + " added to Project " + this.state.data.nameProject}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>

            </Dialog>
        }
        return (
            <div className={"divL"}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                               floatingLabelText="Project Id"
                               onChange={this.handleChangeIdProject}/>
                    <TextField type={"number"}
                               floatingLabelText="Developer Id"
                               onChange={this.handleChangeIdDeveloper}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Add Developer"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
