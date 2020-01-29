import React, { Component } from 'react';
import './../Styles/start.css';

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
            <div>
                <div id="wrapper">
                    <button onClick={this.props.handler} className="my-super-cool-btn">
                        <div className="dots-container">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <span>Start!</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Start;