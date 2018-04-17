import React from "react";
import axios from "axios/index";
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

export default class DeleteProject extends React.Component {

    state = {
        id: 0,
        deletedName: '',
        errorName: '',
        error: 0,
        open: false,
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
            .delete(`http://localhost:8080/projects/${this.state.id}`)
            .then(response => {
                console.log(response);

                this.setState({error: 0});

                this.setState({deletedName: response.data.name});

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
        if (this.state.deletedName.valueOf() === '') {
            dialog = <Dialog
                title={this.state.errorName['Projects']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog
                title={"Project " + this.state.deletedName + " Deleted"}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}> </Dialog>
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                               floatingLabelText="Project Id"
                               onChange={this.handleChangeId}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Delete"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
