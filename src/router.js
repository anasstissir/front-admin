export const routeMiddleware = ({ dispatch }) => next => action => {
    next(action);

    if (action.meta && action.meta.REDIRECT) {
        dispatch({ type: "REDIRECT", redirectTo: action.meta.REDIRECT });
    }

};