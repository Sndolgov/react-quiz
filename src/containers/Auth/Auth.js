import React, {Component} from "react";
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import Schema from 'password-validator'
import {connect} from "react-redux";
import {auth} from "../../store/actions/authActions";


class Auth extends Component {

    passwordSchema;

    constructor(props) {
        super(props);
        this.passwordSchema = new Schema();
        this.passwordSchema
            .is().min(6)
            .has().lowercase()
            .has().uppercase()
            .has().not().spaces();

        this.state = {
            formValid: false,
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Enter the correct email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Enter the correct password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        };
    }


    loginHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );

    };

    signUpHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    };

    submitHandler = (event) => {
        event.preventDefault()
    };


    validateControl(value, validation) {
        if (!validation)
            return true;
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = is.email(value);
        }

        if (validation.minLength) {
            isValid = this.passwordSchema.validate(value) && isValid;
        }
        return isValid
    }

    onChangeHandler(event, controlName) {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;

        let formValid = true;
        // eslint-disable-next-line array-callback-return
        Object.keys(formControls).map((controlName, index) => {
            formValid = formControls[controlName].valid && formValid;
        });

        this.setState({formControls, formValid});
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorisation</h1>
                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                        {/*        <Input
                            label={'Email'}
                        />
                        <Input
                            label={'Password'}
                            errorMessage={'TEST'}
                        />*/}
                        {this.renderInputs()}

                        <Button
                            type={'success'}
                            onClick={this.loginHandler}
                            disabled={!this.state.formValid}
                        >Login</Button>
                        <Button
                            type={'primary'}
                            onClick={this.signUpHandler}
                            disabled={!this.state.formValid}
                        >Sign up</Button>
                    </form>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)