import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-5a6c8.firebaseio.com/'
})