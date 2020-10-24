import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from '../reducer/app'

export const initStore = (
	externalReducers = {},
	preloadedState = null,
	isDev = false
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
			undefined
	)
	//Create store.
	const store = createStore(
		compositeReducer,
		preloadedState,
		devtools
	)
	return store
}