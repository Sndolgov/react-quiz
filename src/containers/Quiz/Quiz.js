import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null, //{[id]:'success' 'error'}
        quiz: [
            {
                question: 'What color is the sky?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Black', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Red', id: 3},
                    {text: 'Green', id: 4}
                ]
            },
            {
                question: 'What year was the Saint Petersburg founded?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1705', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    };

    onAnswerClickHandler = (answerId) => {
        const question = this.state.quiz[this.state.activeQuestion]

        if (question.rightAnswerId === answerId){
            this.setState({answerState: {[answerId]: 'success'}});
            const timeout = window.setTimeout(()=>{
                if (this.isQuizFinished()){
                    console.log('Finished')
                }else {
                    this.setState({activeQuestion: this.state.activeQuestion + 1})
                    this.setState({answerState: null});

                }
                window.clearTimeout(timeout);
            }, 1000)
        }else {
            this.setState({answerState: {[answerId]: 'error'}})
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion+1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all question</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        questionNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz