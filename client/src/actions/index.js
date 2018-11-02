import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';

//redux thunk would check everything we return from an action creator
//if return a function, then it would automatically call dispatch function
//with the word dispatch
export const fetchUser = () => {
    // return function(dispatch) {
    //     //need to make request first and then dispatch, async action
    //     axios.get('/api/current_user')
    //     .then(res => dispatch({
    //         type:FETCH_USER,
    //         payload: res
    //     }));
        
    // }
    // const request = axios.get('/api/current_user');
    // return {
    //     type:FETCH_USER,
    //     payload:request
    // }

    //use async and await to refactor
    return async function(dispatch) {
        //need to make request first and then dispatch, async action
        const res = await axios.get('/api/current_user')
        //we only care the data of user, so only pass in data property
        dispatch({
            type:FETCH_USER,
            payload: res.data
        });    
    }
};
//syntax here means the same as above action
export const handleToken = (token) => async dispatch =>{
    //same code as above only change the quest into post
    
    const res = await axios.post('/api/stripe', token);
    dispatch({
        type: FETCH_USER,
        payload:res.data
    })
}

export const submitSurvey = (values,history) =>async dispatch => {
    const res = await axios.post('/api/surveys',values);
    history.push('/surveys');
    dispatch({
        type:FETCH_USER,
        payload: res.data
    })
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({
        type:FETCH_SURVEYS,
        payload:res.data
    })
}