import * as type from "../actions/actionType";

const initialState = {
    currentUser: null,
    drives: [],
    station: null,

    user: null,
    Flag: false,
    // users:[]

}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case type.CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        case type.CURRENT_STATION:
            return {
                ...state,
                station: action.payload
            }
        case type.SELECT_DRIVES:
            return {
                ...state,
                drives: action.payload
            }

        case type.ADD_DRIVES:
            return {
                ...state,
                drives: [...state.drives, action.payload]
            }
        case type.DELETE_DRIVE:
            let arr = [...state.drives].filter(x => x.id != action.payload);

            return {
                ...state,
                drives: arr
            }
        case type.UPDATE_DRIVE:
            return {
                ...state
            }
        // case type.ADD_USER:
        //     return{
        //         ...state,
        //         user:action.payload,
        //         // drives:[],
        //       //  users:[...state.users,action.payload]
        //     }
        case type.LOG_OUT:
            return {
                ...state,
                user: null,
            }

        case type.HISTORY_DRIVES:
            return {
                ...state,
                drives: [...action.payload]
            }

        case type.CHANGE_FLAG_TRUE:
            return {
                ...state,
                Flag: true
            }

        case type.CHANGE_FLAG_FALSE:
            return {
                ...state,
                Flag: false
            }



    }


    return state

}


export default UserReducer;