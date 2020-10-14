import stateSchema from "./stateSchema";
import tv4 from 'tv4';

export default ({dispatch, getState}) => (next) => (action) => {
    next(action);

    if (!tv4.validate(getState(), stateSchema)) {
        console.warn('Invalid state schema detected');
    }
};


//Different from the async middleware we
// do want to go through our next middleware,
// because that would mean there is no error
// with the validation.