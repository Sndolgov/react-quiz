import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";

export default (props) => {
    // let rightAnswers = 0;
    const rightAnswers = Object.keys(props.results).reduce((total, key) => {
            if (props.results[key] === 'success')
                total++;
            return total;
        },
        0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {/*<li>
                    <strong>1. </strong>
                    How are you?
                    <i className={'fa fa-times ' + classes.error}/>
                </li>
                <li>
                    <strong>2. </strong>
                    How are you?
                    <i className={'fa fa-check ' + classes.success}/>
                </li>*/}

                {
                    props.quiz.map((question, index) => {
                        const cls = [
                            'fa',
                            props.results[question.id] === 'success' ? 'fa-check' : 'fa-times',
                            classes[props.results[question.id]]
                        ];
                        // rightAnswers = props.results[question.id] === 'success'? ++rightAnswers : rightAnswers

                        return (
                            <li key={index}>
                                <strong>{index + 1}</strong>.&nbsp;
                                {question.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })}
            </ul>

            <p>Right {rightAnswers} out of {props.quiz.length}</p>
            <div>
                <Button
                    onClick={() => props.onRetry()}
                    type = "primary"
                >Retry</Button>
                <Button
                    type = "success"
                >Go to the test list</Button>
            </div>
        </div>
    )
}