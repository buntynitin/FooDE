export const locationinitialState = {hasaddress:false}
const locationreducer = (state, action) => {
    switch (action.type) {
        case 'ADDLOCATION':
            return action.item;
        default:
            return state;

    }
}


export default locationreducer