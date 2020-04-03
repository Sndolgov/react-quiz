import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/authActions";

class App extends Component {
    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        const routs = !this.props.isAuthenticated
            ?<Switch>
                <Route path='/auth' component={Auth}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/' component={QuizList}/>
                <Redirect exact to={'/'}/>
            </Switch>
            :<Switch>
                <Route path='/quiz-creator' component={QuizCreator}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/' component={QuizList}/>
                <Redirect to={'/'}/>
            </Switch>;


        return (
            <Layout>
                {routs}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
