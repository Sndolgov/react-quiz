import axios from "../../axios/axios-quiz";
import {CLEAR_QUIZ, CREATE_QUIZ_QUESTION} from "./actionTypes";

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

function clearQuiz() {
    return {
        type: CLEAR_QUIZ
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('quizzes.json', getState().createReducer.quiz);
        dispatch(clearQuiz())
    }

}