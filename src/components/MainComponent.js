import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Registration from "./RegistrationComponent";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        const HomePage = () => {
            return(
                <div>
                    <h1>
                        Home page
                    </h1>
                </div>
            );
        };

        return (
            <div>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/signup' component={() => <Registration />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;