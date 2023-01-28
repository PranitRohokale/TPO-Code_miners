import { INTERVIEW_ROUND_ADD, INTERVIEW_ROUND_ALL, INTERVIEW_ROUND_FAILD, INTERVIEW_ROUND_RESET, INTERVIEW_ROUND_REQUEST } from "../constants/interviewRoundConstants";
import { supabase } from "../Utils/supabase.config"


export const addNewRound = (newRoundDetail) => async (dispatch) => {
    dispatch({
        type: INTERVIEW_ROUND_REQUEST,
    })

    const { data, error } = await supabase
        .from('Rounds')
        .insert(newRoundDetail)
        .select()

    if (error)
        dispatch({
            type: INTERVIEW_ROUND_FAILD,
            payload: "something went wrong!!"
        })
    else
        dispatch({
            type: INTERVIEW_ROUND_ADD,
            payload: data?.[0] ?? [],
        })
}

export const getAllRoundsDetails = (jobId) => async (dispatch) => {
    try {
        dispatch({
            type: INTERVIEW_ROUND_REQUEST,
        })


        const { data, error } = await supabase
            .from('Rounds')
            .select()
            .eq('jobId', jobId)
            .order('inserted_at', { ascending: true })

        // console.log("getAllRoundsDetails ", data);

        if (error)
            dispatch({
                type: INTERVIEW_ROUND_FAILD,
                payload: "something went wrong!!"
            })
        else
            dispatch({
                type: INTERVIEW_ROUND_ALL,
                payload: data ?? [],
            })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error

        dispatch({
            type: INTERVIEW_ROUND_FAILD,
            payload: message
        })
    }
}