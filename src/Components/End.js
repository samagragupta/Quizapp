import React, { Component } from 'react';
import './../Styles/end.css';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startquiz: false,
        }
    }
    handleChange = () => {
        var quizz = this.state.startquiz;
        this.props.onstart(quizz);
    }
    render() {
        return (
            <div className="title">
                <p className="text">
                    Your Result: 
                </p>
                <p className="answer">
                    {this.props.crctansw}
                </p>
            </div>
        );
    }
}

export default Start;