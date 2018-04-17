import React from "react";
import axios from "axios";
import '../../App.css'
import {DatePicker, Dialog, FlatButton, MuiThemeProvider, RaisedButton, TextField} from "material-ui";
import {blueGrey500, grey100} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import moment from "moment";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500,
        accent1Color: grey100,
    },
    datePicker: {}
});

export default class CreateProject extends React.Component {

    state = {
        name: '',
        code: '',
        beginDate: '',
        endDate: '',
        client: '',
        project: '',
        error: 0,
        errorName: '',
        open: false,
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeName = event => {
        this.setState({name: event.target.value});

    };

    handleChangeCode = event => {
        this.setState({code: event.target.value});

    };

    handleChangeBeginDate = (event, date) => {
        this.setState({beginDate: date});

    };

    handleChangeEndDate = (event, date) => {
        this.setState({endDate: date});

    };

    handleChangeClient = event => {
        this.setState({client: event.target.value});

    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({error: 1});

        const project = {
            name: this.state.name,
            code: this.state.code,
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            client: this.state.client,
        };

        axios.post(`http://localhost:8080/projects`, project)
            .then(response => {
                console.log(response);
                this.setState({error: 0});

                const newProject = {
                    id: response.data.id,
                    name: response.data.name,
                    code: response.data.code,
                    beginDate: response.data.beginDate,
                    endDate: response.data.endDate,
                    client: response.data.client.name
                };

                const newState = Object.assign({}, this.state, {
                    project: newProject
                });
                this.setState(newState);

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
                title={"Project " + this.state.name + " created"}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <h4>{this.state.project.name}'s Id: </h4>{this.state.project.id}
                <h4>{this.state.project.name}'s Code: </h4>{this.state.project.code}
                <h4>{this.state.project.name}'s Begin
                    Date: </h4>{moment(new Date(this.state.project.beginDate)).format('MMM Do YY')}
                <h4>{this.state.project.name}'s End
                    Date: </h4>{moment(new Date(this.state.project.endDate)).format('MMM Do YY')}
                <h4>{this.state.project.name}'s Client: </h4>{this.state.project.client}
            </Dialog>
        }
        return (
            <div className={"divL"}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField floatingLabelText="Project Name"
                               onChange={this.handleChangeName}/>
                    <TextField floatingLabelText="Project Code"
                               onChange={this.handleChangeCode}/>
                    <DatePicker hintText="Project Begin Date"
                                onChange={this.handleChangeBeginDate}/>
                    <DatePicker hintText="Project End Date"
                                onChange={this.handleChangeEndDate}/>
                    <TextField className={"num"}
                               type={"number"}
                               floatingLabelText="Project Client (Id)"
                               onChange={this.handleChangeClient}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Create Project"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
