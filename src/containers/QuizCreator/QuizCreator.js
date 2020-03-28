import React, {Component} from "react";
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/FormFramwork";
import Input from "../../components/UI/Input/Input";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Select from "../../components/UI/Select/Select";
import axios from "../../axios/axios-quiz";


function createOptionControl(number) {
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Value can not be empty',
        id: number
    }, {
        required: true
    })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter question',
            errorMessage: 'Question can not be empty',
        }, {
            required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreator extends Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        quiz: [],
        formControls: createFormControls()
    };

    submitHandler = (event) => {
        //отменяем стандартное повеление
        event.preventDefault()
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,

            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };
        quiz.push(questionItem);
        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
    };

    createQuizHandler = async (event) => {
        event.preventDefault();
        try{
            await axios.post('quizzes.json', this.state.quiz);

            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls()
            });
        } catch (e) {
            console.log(e)
        }

        // axios.post('https://react-quiz-5a6c8.firebaseio.com/quizzes.json', this.state.quiz)
        //     .then(responce => console.log(responce))
        //     .catch(error => console.log(error))

    };

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = value;
        control.touched = true;
        control.valid = validate(value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    };

    selectChangeHandler = (event) => {
        this.setState({rightAnswerId: +event.target.value})
    };

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Auxillary key={controlName + index}
                >
                    <Input
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChangeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxillary>

            )
        })
    }

    render() {
        const select = <Select
            lable={'Choose correct answer'}
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />;

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz Creator</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>

                        <Button
                            type={'success'}
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Create quiz
                        </Button>
                    </form>

                </div>
            </div>
        )
    }
}