import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                //Toma todo el state como se encuentre en ese momento para que no existan mutaciones en este
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        /* Loading */
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }

}