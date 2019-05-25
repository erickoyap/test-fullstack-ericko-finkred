import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            emailAddress: '',
            password: '',
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

        fetch('http://localhost:3001/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(jsonData)
        }).then(result => {
            return result.json();
        }).then(output => {
            this.setState({
               loadingSubmit: false
            });

            alert(output.message);
            if (output.success) {
                window.location = 'user/list';
            }
        });
    }

    render(){
        return (
            <Container className="Login" style={{width:"576px"}}>
                <h5 style={{textAlign:'center', marginBottom:"25px"}}>Login</h5>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" lg="3">Email </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                name="emailAddress"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="Input Email Address..."
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
                        { this.state.loadingSubmit ? 'Logging in...' : "Login" }
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Login;