import React from 'react';
import UserDelete from './UserDelete';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class UserList extends React.Component {

    constructor(){
        super();
        this.state = {
            isLoading: true,
          results: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/user")
            .then(results => {
                return results.json();
            }).then(data => {
                console.log(data);
                if (data.command){
                    window.location = "/login";
                }

                let results;
                if (data.data.length > 0) {
                    results = data.data.map((row, index) => {
                        const urlGet = "/user/update/" + row.id;

                        return (
                            <tr key={row.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Button size={"sm"}
                                            href={urlGet}
                                            variant="outline-primary">
                                        Update
                                    </Button>
                                    <br/>
                                    <UserDelete dataId={row.id}/>
                                </td>
                                <td>{row.customId}</td>
                                <td>{row.userName}</td>
                                <td>{row.emailAddress}</td>
                                <td>{row.accountNumber}</td>
                                <td>{row.identityNumber}</td>
                            </tr>
                        );
                    });
                }
                else {
                    this.setState({isLoading:false});
                    results = (
                        <tr>
                            <td colspan="7" style={{textAlign:"center"}}>
                                No data yet.
                            </td>
                        </tr>);
                }
                this.setState({isLoading: false, results: results});

        });

    }

    render(){
        return (
            <div className="User List">
                <h4>List User</h4>
                {this.state.isLoading === false ?
                    <Table style={{border: "1px"}}>
                        <thead>
                        <tr style={{fontWeight:"bold"}}>
                            <td>No</td>
                            <td>Action</td>
                            <td>ID</td>
                            <td>User Name</td>
                            <td>Email Address</td>
                            <td>Account Number</td>
                            <td>Identity Number</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.results}
                        </tbody>
                    </Table> : <p>Loading...</p>
                }
            </div>
        );
    }
}

export default UserList;

