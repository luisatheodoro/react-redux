export default ({dispatch}) => next => action => {
    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    action.payload.then(function(response) {
            const newAction = {...action, payload: response}
            dispatch(newAction);
    })
}





//Check to see if the action has a promise
// on its 'payload' property. If it does
//then wait for it to resolve. If it doesn't
//then send the action to the next middleware.


//We wait for the promise to resolve
//Get its data and then create a new action
//with that data and dispatch it

//The dispatch takes an action and eventually
// makes sure the action gets sent to the middlewares
