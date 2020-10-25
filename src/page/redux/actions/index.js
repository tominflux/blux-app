import APP_ACTION_TYPES from '../../../redux/actionTypes/app'


const actualisePageAction = (pageId, pageAction) => ({
	type: APP_ACTION_TYPES.PAGE_ACTION,
	payload: {
		pageId,
		pageAction
	}
})

export const getPageDispatchers = (page, pageId, dispatch) => {
	//If page has no redux behaviour...
	if (!page.redux) {
		//Return no dispatchers.
		return { }
	}
	//Get page actions from page.
	const pageActionFns = page.redux.actions
	//Build object with page's dispatchers by
	//looping through keys of page actions.
	let pageDispatchers = {}
	for (const key in pageActionFns) {
		//Extract page action.
		const pageActionFn = pageActionFns[key]
		//Build dispatcher from action.
		const pageDispatcher = (...params) => {
			const pageAction = pageActionFn(...params)
			const action = actualisePageAction(pageId, pageAction)
			dispatch(action)
		}
		pageDispatchers = {
			...pageDispatchers,
			[key]: pageDispatcher
		}
	}
	//Return copy.
	return {...pageDispatchers}
}