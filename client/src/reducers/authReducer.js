import {FETCH_USER} from '../actions/types';
//auth reducer
export default function(state = null,action) {
    switch (action.type){
        case FETCH_USER: 
        //a little trick, we could use a if statement instead
        //javascript treat emtpy string as false
        //so when no user, action.payload=''
        //''||false = false
        //but normal string is not boolean, so return normal string
            console.log(action.payload);
            return action.payload || false;
        default: 
            return state;
    }
};