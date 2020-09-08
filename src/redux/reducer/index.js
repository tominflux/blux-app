import { getInitialAppState } from "../initialState"


const App = (state=getInitialAppState(), action) => {
    switch (action.type) {
        case FETCH_PAGES: 
            return {
                ...state,
                pages: null,
                requesting: true
            }
        case RECEIVE_PAGES:
            const { receivedPages } = action.payload
            return {
                ...state,
                requesting: false,
                pages: receivedPages
            }
        case PAGE_ACTION: 
            const { pageId, pageAction } = action.payload
            const pageState = {}
            const newPageState = PageReducer(pageState, pageAction)
            const pagesWithUpdatedPage = immutableReplace(
                pageId, newPageState, state.pages
            )
            return {
                ...state,
                pages: pagesWithUpdatedPage
            }
        default: 
            return state
    }
}


/////////
/////////


const compositeReducer = combineReducers({
    App
})


export default compositeReducer