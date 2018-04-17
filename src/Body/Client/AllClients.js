import React from "react";
import axios from "axios";
import ClientList from "./ClientList";


export default class AllClient extends React.Component {

    state = {
        clients: []
    };

    componentDidMount() {
        axios
            .get("http://localhost:8080/clients")
            .then(response => {

                const newClients = response.data.map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        representativeName: c.representativeName,
                        representativeEmail: c.representativeEmail
                    };
                });

                const newState = Object.assign({}, this.state, {
                    clients: newClients
                });

                this.setState(newState);
            }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <ClientList clients={this.state.clients}/>
            </div>
        );
    }
}
