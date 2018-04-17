import React from "react";
import axios from "axios";
import DeveloperList from "./DeveloperList";

export default class AllClient extends React.Component {

    state = {
        developers: []
    };

    componentDidMount() {
        axios
            .get("http://localhost:8080/developers")
            .then(response => {

                // create an array of developers only with relevant data
                const newDevelopers = response.data.map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        login: c.login,
                        email: c.email,
                        tel: c.tel
                    };
                });

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    developers: newDevelopers
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));

    }

    render() {
        return (
            <div>
                <DeveloperList developers={this.state.developers}/>
            </div>
        );
    }
}
