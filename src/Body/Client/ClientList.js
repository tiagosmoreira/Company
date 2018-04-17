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
import {blueGrey500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey500
    }
});

export default ClientList

function ClientList(props) {

    return (
        <div className={"table"}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Table height={200}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                All Clients
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Representative Name</TableHeaderColumn>
                            <TableHeaderColumn>Representative Email</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {props.clients.map(c =>
                            <TableRow>
                                <TableRowColumn>{c.id}</TableRowColumn>
                                <TableRowColumn>{c.name}</TableRowColumn>
                                <TableRowColumn>{c.representativeName}</TableRowColumn>
                                <TableRowColumn>{c.representativeEmail}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </MuiThemeProvider>
        </div>
    );
}