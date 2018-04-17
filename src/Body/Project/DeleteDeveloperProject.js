import React from "react";
import axios from "axios";
import {
    Dialog,
    FlatButton,
    MuiThemeProvider,
    RaisedButton,
    TextField
} from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {blueGrey500, grey100} from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class DeleteDeveloperProject extends React.Component {

    state = {
        idProject: 0,
        idDeveloper: 0,
        error: 0,
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

        axios.delete(`http://localhost:8080/projects/${this.state.idProject}/${this.state.idDeveloper}`)
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
                title={this.state.errorName['Projects']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog
                title={"Developer removed from Project"}
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
                                  label="Remove Developer"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
