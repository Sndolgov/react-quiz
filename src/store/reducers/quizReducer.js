import {} from "../actions/actionTypes";
import {FETCH_QUIZZES_START} from "../actions/actionTypes";
import {FETCH_QUIZZES_SUCCESS} from "../actions/actionTypes";
import {FETCH_QUIZZES_ERROR} from "../actions/actionTypes";
import {FETCH_QUIZ_SUCCESS} from "../actions/actionTypes";
import {QUIZ_SET_STATE} from "../actions/actionTypes";
import {FINISH_QUIZ} from "../actions/actionTypes";
import {QUIZ_NEXT_QUESTION} from "../actions/actionTypes";
import {RETRY_QUIZ} from "../actions/actionTypes";


const initialState = {
    quizzes: [],
    loading: false,
    error: null,
    results: {}, //{[id]: 'success' 'error'}
    activeQuestion: 0,
    isFinished: false,
    answerState: null, //{[id]:'success' 'error'}
    quiz: null
};

export default function quizReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_QUIZZES_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state,
                quizzes: action.quizzes,
                loading: false
            };
        case FETCH_QUIZZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            };
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            };
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: state.activeQuestion + 1,
                answerState: null
            };
        case RETRY_QUIZ:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            };
        default:
            return state;
    }
}