import React from "react";
import axios from "axios/index";
import {blueGrey500, grey100} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {DatePicker, Dialog, FlatButton, MuiThemeProvider, RaisedButton, TextField} from "material-ui";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class UpdateProject extends React.Component {

    state = {
        id: 0,
        name: '',
        beginDate: '',
        endDate: '',
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

    handleChangeName = event => {
        this.setState({name: event.target.value});
    };

    handleChangeBegDate = (event, date) => {
        this.setState({beginDate: date});
    };

    handleChangeEndDate = (event, date) => {
        this.setState({endDate: date});
    };

    handleSubmit = event => {

        this.setState({error: 1});

        event.preventDefault();

        axios
            .put(`http://localhost:8080/projects/${this.state.id}`, {
                name: this.state.name,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate,
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
                title={this.state.errorName['Projects']}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
            </Dialog>
        } else {
            dialog = <Dialog
                title={"Project updated"}
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
                    <TextField floatingLabelText="New Project Name"
                               onChange={this.handleChangeName}/>
                    <DatePicker floatingLabelText="New Begin Date"
                                onChange={this.handleChangeBegDate}/>
                    <DatePicker floatingLabelText="New End Date"
                                onChange={this.handleChangeEndDate}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Update Project"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
