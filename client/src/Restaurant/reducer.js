import jwt_decode from "jwt-decode";

var mystate = {isLoggedin : false}
const storedJwt = localStorage.getItem('restaurant_token');
if (storedJwt) {
    const obj = jwt_decode(storedJwt);
    obj["isLoggedin"] = true;
    obj["token"] = storedJwt;
    mystate = obj;
}

export const initialState = mystate



const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.item;

        case 'LOGOUT':
            const storedJwt = localStorage.getItem('restaurant_token');
            if (storedJwt) {
                localStorage.removeItem('restaurant_token');
            }

            return { isLoggedin: false }
        default:
            return state;

    }
}


export default reducer