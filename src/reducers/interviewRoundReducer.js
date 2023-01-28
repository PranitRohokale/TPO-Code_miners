import { INTERVIEW_ROUND_ADD, INTERVIEW_ROUND_ALL, INTERVIEW_ROUND_REQUEST, INTERVIEW_ROUND_RESET, INTERVIEW_ROUND_FAILD } from "../constants/interviewRoundConstants"



export const interviewRoundReducer = (state = { rounds: [] }, action) => {
    switch (action.type) {
        case INTERVIEW_ROUND_REQUEST:
            return { ...state, loading: true, error: false }
        case INTERVIEW_ROUND_FAILD:
            return { ...state, loading: false, error: action.payload || true }
        case INTERVIEW_ROUND_RESET:
            return { rounds: [] }
        case INTERVIEW_ROUND_ADD:
            let existingRounds = state.rounds
            let newRound = action.payload
            return { rounds: [...existingRounds, newRound], loading: false, error: false }
        case INTERVIEW_ROUND_ALL:
            return { rounds: action.payload, loading: false, error: false }
        default:
            return state
    }
}