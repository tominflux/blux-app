import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import App from '../reducer'

export const initStore = (
    externalReducers={},
    preloadedState=null,
    isDev=false
) => {
    //Combine reducers.
    const compositeReducer = combineReducers({
        App,
        ...externalReducers
    })
    //
    const devtools = (
        isDev ?
            composeWithDevTools(applyMiddleware()) :
            null
    )
    //Create store.
    const store = createStore(
        compositeReducer,
        preloadedState,
        devtools
    )
    return store
}