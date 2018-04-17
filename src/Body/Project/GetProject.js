import React from "react";
import axios from "axios/index";
import {blueGrey500, grey100} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {Dialog, FlatButton, MuiThemeProvider, RaisedButton, TextField} from "material-ui";
import moment from "moment/moment";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
        ,
        accent1Color: grey100
    }
});

export default class GetProject extends React.Component {

    state = {
        id: 0,
        open: false,
        project: '',
        error: 0,
        errorName:'',
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
            .get(`http://localhost:8080/projects/${this.state.id}`)
            .then(response => {
                console.log(response)
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
            console.log(err.response.data[0]);
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
                title={"Project " + this.state.project.name}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <h4>{this.state.project.name}'s Code: </h4>{this.state.project.code}
                <h4>{this.state.project.name}'s Begin Date: </h4>{moment( new Date(this.state.project.endDate)).format('MMM Do YY')}
                <h4>{this.state.project.name}'s End Date: </h4>{moment( new Date(this.state.project.endDate)).format('MMM Do YY')}
                <h4>{this.state.project.name}'s Client: </h4>{this.state.project.client}
            </Dialog>
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <TextField type={"number"}
                               floatingLabelText="Project Id"
                               onChange={this.handleChangeId}/>
                    <br/>
                    <RaisedButton onClick={this.handleSubmit}
                                  label="Find Project"
                                  primary={true}/>
                    {dialog}
                </MuiThemeProvider>
            </div>
        );
    }
}
