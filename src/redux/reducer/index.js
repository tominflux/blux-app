import { getInitialAppState } from "../initialState"
import { APP_ACTION_TYPES } from "../actionTypes"


///////////
///////////


const App = (state=getInitialAppState(), action) => {
    switch (action.type) {
        case APP_ACTION_TYPES.FETCH_PAGES: 
            return {
                ...state,
                pages: null,
                requesting: true
            }
        case APP_ACTION_TYPES.RECEIVE_PAGES:
            const { receivedPages } = action.payload
            return {
                ...state,
                requesting: false,
                pages: receivedPages
            }
        case APP_ACTION_TYPES.PAGE_ACTION: 
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


export default App