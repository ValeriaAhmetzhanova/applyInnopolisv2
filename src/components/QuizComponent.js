import React, { Component } from 'react';
import { TEST } from "../shared/questions";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import Cookies from "universal-cookie";

class Quiz extends Component {

    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            questions: TEST,
            attempt: '',
            allowed: false,
            answers: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentDidMount() {
        this._isMounted = true;
        // setTimeout(this.loadTest(), 2000);
        console.log('mounted');
        this.loadTest();
    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log('unmounted');
    }

    handleInputChange(event) {

        console.log(event.target.id);
        console.log(event.target.value);

        let answers = this.state.answers;

        answers[event.target.id] = event.target.value;

        this.setState({
            answers:answers
        });

        console.log(answers);

    }

    handleSubmit(event) {

        const cookies = new Cookies();

        fetch('http://34.229.238.197/api/tests/save', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ cookies.get('token').token,
            },
            body: JSON.stringify({
                attempt_id: this.state.attempt,
                answers: Object.values(this.state.answers).map((ans) => {
                    return {id: ans, value: "1"};
                })
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => this.setState({token: responseJson.success}))
            .catch((error) => {
                alert(error);
                console.error(error);
            });

        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    loadTest() {
        const cookies = new Cookies();

        fetch('http://34.229.238.197/api/tests/can', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ cookies.get('token').token,
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson.success);


                if (responseJson.success) {
                    this.setState({allowed: true});

                    const cookies = new Cookies();

                    fetch('http://34.229.238.197/api/tests/attempt', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + cookies.get('token').token,
                        }
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({attempt: responseJson.success.attempt_id});
                            this.setState({questions: responseJson.success.test.questions})

                            console.log(this.state.questions);

                            let answers = {};
                            let correctAnswers = {};

                            this.state.questions.forEach(function (question) {
                                answers[question.id] = question.answers[0].id + "";
                                correctAnswers[question.id] = question.answers.filter((ans) => {
                                    return ans.is_correct===1;
                                }).map((ans) => {return ans.id});
                            });

                            this.setState({answers: answers});
                            this.setState({correctAnswers: correctAnswers});

                            console.log(answers);
                        })
                        .catch((error) => {
                            alert(error);
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });



    }

    render() {

        if (!this.state.allowed) {
            return (
                <h3 className={"interview"}>
                    You are not allowed to pass tests
                </h3>
            )
        }



        const test = this.state.questions.map((question) => {

            const options = question.answers.map((answer) => {
                return(
                    <option value={answer.id} id={answer.id} key={answer.id} >{answer.answer}</option>
                );
            });

            return(
                <div key={question.id}>
                    <FormGroup row>
                        <Label htmlFor="question" md={2}>{question.question}</Label>
                        <Col md={{size: 3, offset: 1}}>
                            <Input type="select" name="answer" id={question.id} onChange={this.handleInputChange}>
                                {options}
                            </Input>
                        </Col>
                    </FormGroup>
                </div>
            );
        });

        return (
            <div>
                <Form>
                    <div>
                        {test}
                    </div>
                    <FormGroup row>
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}

export default Quiz;