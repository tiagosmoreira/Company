import React from "react";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {MuiThemeProvider} from "material-ui";
import moment from "moment";


export default ProjectList

function ProjectList(props) {
    return (
        <div className={"table"}>
            <MuiThemeProvider>
                <Table height={200}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                All Projects
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Code</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Begin Date</TableHeaderColumn>
                            <TableHeaderColumn>End Date</TableHeaderColumn>
                            <TableHeaderColumn>Client</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {props.projects.map(c =>
                            <TableRow>
                                <TableRowColumn>{c.id}</TableRowColumn>
                                <TableRowColumn>{c.name}</TableRowColumn>
                                <TableRowColumn>{c.code}</TableRowColumn>
                                <TableRowColumn>{moment( new Date(c.beginDate)).format('MMM Do YY')}</TableRowColumn>
                                <TableRowColumn>{moment( new Date(c.endDate)).format('MMM Do YY')}</TableRowColumn>
                                <TableRowColumn>{c.clientName}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </MuiThemeProvider>
        </div>
    );
}