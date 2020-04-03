import {CREATE_QUIZ_QUESTION} from "../actions/actionTypes";
import {CLEAR_QUIZ} from "../actions/actionTypes";

const initialState = {
    quiz: []
};

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            };
        case CLEAR_QUIZ:
            return {
                ...state,
                quiz: []
            };
        default:
            return state;
    }
}