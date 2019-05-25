import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class ContactAdd extends React.Component {

    constructor(){
        super();
        this.state = {
            id: '',
            userName: '',
            emailAddress: '',
            accountNumber: '',
            identityNumber: '',
            password:'',
            loadingSubmit: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        fetch('http://localhost:3001/user', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(jsonData)
        }).then(result => {
            return result.json();
        }).then(output => {
            alert(output.message);
            this.setState({
                id: '',
                userName: '',
                emailAddress: '',
                accountNumber: '',
                identityNumber: '',
                password: '',
                loadingSubmit: false
            });

        });
    }

    render(){
        return (
            <Container as="div" style={{width:"576px"}} className="UserAdd">
                <h4>Add User</h4>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" lg="3">ID </Form.Label>
                        <Col>
                            <Form.Control
                                   type="text"
                                   name="id"
                                   value={this.state.id}
                                   onChange={this.handleChange}
                                   placeholder="Input ID..."
                                   size="sm"
                                   required />
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
                                   required />
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
                                required />
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
                                required />
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
                                   required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" lg="3">Password </Form.Label>
                        <Col>
                            <Form.Control
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Input Password..."
                                size="sm"
                                required />
                        </Col>
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="outline-primary"
                        style={{float:"right"}}
                        disabled={ this.state.loadingSubmit }>
                        { this.state.loadingSubmit ? 'Submitting...' : "Submit" }
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default ContactAdd;

