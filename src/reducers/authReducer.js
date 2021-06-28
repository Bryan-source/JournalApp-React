import { types } from "../types/types";


export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            /* es payload.uid y payload.displayname debido a que en la action payload es un objeto con más de un elemento sin únicamente tuviera un elemento entonces sería action.payload */
            return {
                /* uid y name aaprecen en Redux cuando el usuario se autentica */
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
            /* Devuelve un objeto vacío porque se está haciendo logout */
        case types.logout:
            return { }

        default:
            return state;
    }
}