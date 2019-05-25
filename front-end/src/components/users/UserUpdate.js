import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class UserUpdate extends React.Component {

    constructor(id){
        super();
        this.state = {
            customId: '',
            userName: '',
            emailAddress: '',
            accountNumber: '',
            identityNumber: '',
            loadingSubmit: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        this.setState({
           isLoading: true
        });
        fetch("http://localhost:3001/user/" + this.props.match.params.id)
            .then(results => {
                return results.json();
            }).then(get => {
                console.log(get);
                if (get.result === 'success') {
                    this.setState({
                        customId: get.data.customId,
                        userName: get.data.userName,
                        emailAddress: get.data.emailAddress,
                        accountNumber: get.data.accountNumber,
                        identityNumber: get.data.identityNumber,
                        isLoading: false
                    });
                }
                else {
                    alert('Data not found! Redirecting...');
                    window.location = '/';
                }
            });
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if (!event.target.checkValidity()) {
            return;
        }
        const jsonData = this.state;

        this.setState({
           loadingSubmit: true
        });

        fetch('http://localhost:3001/user/' + this.props.match.params.id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(jsonData)
        }).then(result => {
            return result.json();
        }).then(output => {
            console.log(output);
            alert(output.message);
            if (output.statusCode === 200) {
                this.setState({
                    customId: output.data.customId,
                    userName: output.data.userName,
                    emailAddress: output.data.emailAddress,
                    accountNumber: output.data.accountNumber,
                    identityNumber: output.data.identityNumber
                });
            }

            this.setState({
               loadingSubmit: false
            });
        }).catch(err => {
            console.log(err);
            alert (err);
        });
    }

    render(){
        return (
            <Container as="div" style={{width:"576px"}} className="UserUpdate">
                <h3>View / Update User</h3>
                {this.state.isLoading ?
                    <p>Loading...</p> :
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" lg="3">ID </Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="customId"
                                    value={this.state.customId}
                                    onChange={this.handleChange}
                                    placeholder="Input ID..."
                                    size="sm"
                                    required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" lg="3">User Name</Form.Label>
                            <Col>
                                <Form.Control type="text"
                                              name="userName"
                                              value={this.state.userName}
                                              onChange={this.handleChange}
                                              placeholder="Input User Name..."
                                              size="sm"
                                              required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" lg="3">Email Address </Form.Label>
                            <Col>
                                <Form.Control
                                    type="email"
                                    name="emailAddress"
                                    value={this.state.emailAddress}
                                    onChange={this.handleChange}
                                    placeholder="Input Email Address..."
                                    size="sm"
                                    required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" lg="3">Account Number </Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="accountNumber"
                                    value={this.state.accountNumber}
                                    onChange={this.handleChange}
                                    placeholder="Input Account Number..."
                                    size="sm"
                                    required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" lg="3">Identity Number </Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="identityNumber"
                                    value={this.state.identityNumber}
                                    onChange={this.handleChange}
                                    placeholder="Input Identity Number..."
                                    size="sm"
                                    required/>
                            </Col>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="outline-primary"
                            style={{float: "right"}}
                            disabled={ this.state.loadingSubmit }>
                            { this.state.loadingSubmit ? 'Updating...' : "Update" }
                        </Button>
                    </Form>
                }
            </Container>
        );
    }
}

export default UserUpdate;

