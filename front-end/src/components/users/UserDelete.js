import React from 'react';
import Button from 'react-bootstrap/Button';

class UserDelete extends React.Component {

    constructor(){
        super();

        this.confirmDelete = this.confirmDelete.bind(this);
    }

    confirmDelete(){
        fetch('http://localhost:3001/user/' + this.props.dataId, {
                header: new Headers({
                    'Content-Type': 'application/json',
                }),
                method: 'DELETE',
                body: JSON.stringify({id: this.props.dataId})
            })
            .then(result => {
                return result.json();
            })
            .then(output => {
                alert(output.message);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            })
            .finally(() => {
                window.location = "/user/list";
            });
    }

    render(){
        // const urlDelete = "/user/delete/" + this.props.dataId;
        return (
            <Button onClick={this.confirmDelete}
                    size={"sm"}
                    variant="outline-danger">
                Delete
            </Button>
        );
    }
}

export default UserDelete;

