import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quizActions";

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all question</h1>
                    {this.props.loading || !this.props.quiz ?
                        <Loader/> :
                        this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryQuiz}
                            /> :
                            <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                questionNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quizReducer.results,
        activeQuestion: state.quizReducer.activeQuestion,
        isFinished: state.quizReducer.isFinished,
        answerState: state.quizReducer.answerState,
        quiz: state.quizReducer.quiz,
        loading: state.quizReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (quizId) => dispatch(fetchQuizById(quizId)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

