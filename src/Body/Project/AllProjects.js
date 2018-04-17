import React from "react";
import axios from "axios";
import ProjectList from "./ProjectList";

export default class AllProjects extends React.Component {

    state = {
        projects: []
    };

    componentDidMount() {
        axios
            .get("http://localhost:8080/projects")
            .then(response => {

                const newProjects = response.data.map(c => {
                    console.log(c);

                    return {
                        id: c.id,
                        name: c.name,
                        code: c.code,
                        beginDate: c.beginDate,
                        endDate: c.endDate,
                        clientName:c.client.name
                    };
                });

                const newState = Object.assign({}, this.state, {
                    projects: newProjects
                });

                this.setState(newState);

                console.log(this.state.projects);
            })
            .catch(error => console.log(error));

    }

    render() {
        return (
            <div>
                <ProjectList projects={this.state.projects}/>
            </div>
        );
    }
}
