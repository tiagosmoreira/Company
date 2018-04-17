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


export default DeveloperList

function DeveloperList(props) {
    return (
        <div className={"table"}>
            <MuiThemeProvider>
                <Table height={200}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                All Developers
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Login</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Phone</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {props.developers.map(c =>
                            <TableRow>
                                <TableRowColumn>{c.id}</TableRowColumn>
                                <TableRowColumn>{c.name}</TableRowColumn>
                                <TableRowColumn>{c.login}</TableRowColumn>
                                <TableRowColumn>{c.email}</TableRowColumn>
                                <TableRowColumn>{c.tel}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </MuiThemeProvider>
        </div>
    );
}