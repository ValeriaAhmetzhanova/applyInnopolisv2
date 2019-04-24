import React, {Component} from 'react';
import {
    Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader,
    ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';
import Cookies from 'universal-cookie';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isNavOpen: false,
            isModalOpen: false,
            token: ''
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        fetch('http://34.229.238.197/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.email.value,
                password: this.password.value,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => this.setState({token: responseJson.success}))
            .catch((error) => {
                alert(error);
                console.error(error);
            });
        this.toggleModal();
        console.log(this.state.token);
        const cookies = new Cookies();
        cookies.set('token', this.state.token, {path: '/'});
        console.log(cookies.get('token'));
        alert("Username: " + this.email.value + " Password: " + this.password.value);
        event.preventDefault();
    }

    renderLinks() {
        const cookies = new Cookies();
        var active = true;
        if (cookies.get('token') !== undefined) {
            if ((cookies.get('token').token) === '') active = false;
            if ((cookies.get('token').token) === undefined) active = false;

            // console.log(active);
            // console.log(cookies.get('token').token);
        } else {
            active = false;
        }


        if (active)
            return (
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link ml-lg-5" to='/home'> Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link ml-lg-5" to='/portfolio'> Portfolio</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link ml-lg-5" to='/data'> Data</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link ml-lg-5" to='/quiz'> Quiz</NavLink>
                    </NavItem>
                </Nav>
            );
        else return (
            <div className="ml-auto signIn">
                <Button outline
                        color={"success"}
                        type="submit"
                        size={"lg"}
                        onClick={this.toggleModal}>
                    Sign in
                </Button>
            </div>
        );
    }

    render() {

        return (
            <React.Fragment>
                <Navbar light expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto brand" href="/">Apply Innopolis</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <div>{this.renderLinks()}</div>
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Sign in</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                       innerRef={(input) => this.email = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                       innerRef={(input) => this.password = input}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="success">Sign in</Button>
                            <Link className={"signUp"} to='/signup' onClick={this.toggleModal}>Sign Up</Link>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;