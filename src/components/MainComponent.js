import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Registration from "./RegistrationComponent";
import Portfolio from "./PortfolioComponent";
import Header from "./HeaderComponent";
import Data from "./DataComponent";
import Quiz from "./QuizComponent";
import Cookies from "universal-cookie";


class HomePage extends  Component {
    constructor(props) {
        super(props);

        this.state = {
            date: ''
        };

        const cookies = new Cookies();

        fetch('http://34.229.238.197/api/user/schedule', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ cookies.get('token').token,
            }
        })
            .then((response) => response.json())
            .then((responseJson) => this.setState({date: responseJson.success.date}))
            .catch((error) => {
                alert(error);
                console.error(error);
            });


    }

    render() {
        return(
            <div className={"interview"}>
                <h3>The date of the interview is: {this.state.date}</h3>
            </div>
        );
    }
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };

    }

    render() {

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/signup' component={() => <Registration />} />
                    <Route exact path='/portfolio' component={() => <Portfolio />} />
                    <Route exact path='/data' component={() => <Data />} />
                    <Route exact path='/quiz' component={() => <Quiz />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;