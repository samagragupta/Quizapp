import React, { Component } from 'react';
import './../Styles/quiz.css';

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedOption: null,
      questionSet: [],
      questionNbr: 0,
      answerCorrect: [],
      answersIncorrect: [],
      answersAllRandom: [],
      correctAnswer: 0,
      cDsplay: 'none',
      wDsplay: 'none',
      correctanwerdisplay: 'none',
      loader: true,
    }
  }

  componentDidMount() {
    var url = "https://opentdb.com/api.php?amount=10"
    console.log("url: " + url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.results);
        var questionSet = this.state.questionSet.slice();
        var answerCorrect = this.state.answerCorrect.slice();
        var answersIncorrect = this.state.answersIncorrect.slice();
        var answersAllRandom = this.state.answersAllRandom.slice();

        for (var l = 0; l < 10; l++) {
          answersAllRandom[l] = [0, 0, 0, 0];
        }

        for (var i = 0; i < 10; i++) {
          questionSet.push(data.results[i].question);
          answerCorrect.push(data.results[i].correct_answer);
          answersIncorrect.push(data.results[i].incorrect_answers);
          var arrPlaceholder = [];
          arrPlaceholder[0] = answerCorrect[i];
          arrPlaceholder[1] = answersIncorrect[i]["0"];
          arrPlaceholder[2] = answersIncorrect[i]["1"];
          arrPlaceholder[3] = answersIncorrect[i]["2"];
          // randomizeArray(arrPlaceholder);
          answersAllRandom[i][0] = arrPlaceholder[0];
          answersAllRandom[i][1] = arrPlaceholder[1];
          answersAllRandom[i][2] = arrPlaceholder[2];
          answersAllRandom[i][3] = arrPlaceholder[3];
        }
        this.setState({
          questionSet: questionSet,
          loader: false,
        });
        this.setState({ answerCorrect: answerCorrect });
        this.setState({ answersIncorrect: answersIncorrect });
        this.setState({ answersAllRandom: answersAllRandom });
      });
  }

  submit = (event) => {
    if (event.target.value === this.state.answerCorrect[this.state.questionNbr]) {
      this.setState({
        correctAnswer: this.state.correctAnswer + 1,
        cDsplay: 'block',
      });
    }
    else {
      this.setState({
        wDsplay: 'block',
      });
    }
    this.setState({
      selectedOption: event.target.name,
      correctanwerdisplay: 'block',
    });
    setTimeout(
      function () {
        this.setState({
          selectedOption: null,
          questionNbr: this.state.questionNbr + 1,
          cDsplay: 'none',
          wDsplay: 'none',
          correctanwerdisplay: 'none',
        });
      }
        .bind(this),
      800
    );
    // event.checked = false;
    if (this.state.questionNbr === 2) {
      this.props.sendData('end');
      this.props.sendResult(this.state.correctAnswer);
    }
  }

  render() {
    const styles = {
      correctDisplay: {
        display: this.state.cDsplay,
        color: 'blue',
      },
      wrongDisplay: {
        display: this.state.wDsplay,
        color: 'red',
      },
      correctanwer: {
        display: this.state.correctanwerdisplay,
      }
    };
    const { correctDisplay, wrongDisplay, correctanwer } = styles;
    if (this.state.loader) {
      return (
        <div className="loader-container"><div className="loader"></div></div>
      )
    }
    return (
      <div>
        <div className="container">
          <p className="ques">{this.state.questionSet[this.state.questionNbr]}</p>
          <form>
            <div className="options">
              <label className="option">
                <input type="radio" name="option1" id="option1"
                  value={String(this.state.answersAllRandom[this.state.questionNbr]).split(",")[0]}
                  checked={this.state.selectedOption === 'option1'}
                  onChange={this.submit}
                />
                {String(this.state.answersAllRandom[this.state.questionNbr]).split(",")[0]}
              </label>
            </div>
            <div className="options">
              <label className="option">
                <input type="radio" name="option2"
                  value={String(this.state.answersAllRandom[this.state.questionNbr]).split(",")[1]}
                  checked={this.state.selectedOption === 'option2'}
                  onChange={this.submit}
                />
                {String(this.state.answersAllRandom[this.state.questionNbr]).split(",")[1]}
              </label>
            </div>
            <div className="options">
              <label className="option">
                <input type="radio" name="option3"
                  value={String(this.state.answersAllRandom[this.state.questionNbr]).split(",")[2]}
                  checked={this.state.selectedOption === 'option3'}
                  onChange={this.submit}
                />
                {String(this.state.answersAllRandom[this.state.questionNbr]).split(",")[2]}
              </label>
            </div>
            <div className="options">
              <label className="option">
                <input type="radio" name="option4"
                  value={String(this.state.answersAllRandom[this.state.questionNbr]).split(",")[3]}
                  checked={this.state.selectedOption === 'option4'}
                  onChange={this.submit}
                />
                {String(this.state.answersAllRandom[this.state.questionNbr]).split(",")[3]}
              </label>
            </div>
          </form>
        </div>
        <div className="answers">
          <p style={correctDisplay}>
            Correct Answer
          </p>
          <p style={wrongDisplay}>
            Wrong Answer
          </p>
          <p style={correctanwer} className="correctAnswers">
            {this.state.answerCorrect[this.state.questionNbr]}
          </p>
        </div>
      </div>
    );
  }
}

export default Quiz;