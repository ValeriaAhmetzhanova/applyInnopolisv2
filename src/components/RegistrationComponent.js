import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            level: '',
            agree: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        var lev;
        if (this.state.level === 'Bachelor') lev = 0;
        else if (this.state.level === 'Masters') lev = 1;
        fetch('http://34.229.238.197/api/register\n', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                phone: this.state.phone,
                email: this.state.email,
                password: this.state.password,
                level: lev
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => alert(responseJson))
            .catch((error) => {
                alert(error);
                console.error(error);
            });
        event.preventDefault();
    }

    render() {

        return (
            <div className="row row-content">
                <div className="col-12">
                    <h3>Welcome</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                                <Input type="text" id="firstname" name="firstname"
                                       placeholder="First Name"
                                       value={this.state.firstname}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Input type="text" id="lastname" name="lastname"
                                       placeholder="Last Name"
                                       value={this.state.lastname}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Input type="tel" id="telnum" name="telnum"
                                       placeholder="Tel. number"
                                       value={this.state.telnum}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <Input type="email" id="email" name="email"
                                       placeholder="Email"
                                       value={this.state.email}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="level" md={2}>Level</Label>
                            <Col md={{size: 3, offset: 1}}>
                                <Input type="select" name="level"
                                       value={this.state.level}
                                       onChange={this.handleInputChange}>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox"
                                               name="agree"
                                               checked={this.state.agree}
                                               onChange={this.handleInputChange} /> {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Sign Up
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Registration;