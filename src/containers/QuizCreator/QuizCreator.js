import React, {Component} from "react";
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/FormFramwork";
import Input from "../../components/UI/Input/Input";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/createActions";


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

class QuizCreator extends Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    submitHandler = (event) => {
        //отменяем стандартное повеление
        event.preventDefault()
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz +1,
            rightAnswerId: this.state.rightAnswerId,

            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };

        this.props.createQuizQuestion(questionItem);
        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });

    };

    createQuizHandler = (event) => {
        event.preventDefault();
        try{
            this.props.finishCreateQuiz();

            this.setState({
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
                            disabled={this.props.quiz.length === 0}
                        >
                            Create quiz
                        </Button>
                    </form>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.createReducer.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)