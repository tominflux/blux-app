import { getInitialAppState } from "../../initialState/app"
import APP_ACTION_TYPES from "../../actionTypes/app"


///////////
///////////


const App = (state = getInitialAppState(), action) => {
    switch (action.type) {
        case APP_ACTION_TYPES.FETCH_PAGE:
            return {
                ...state,
                isRequesting: true,
            }
        case APP_ACTION_TYPES.RECEIVE_PAGE:
            const { receivedPage } = action.payload
            const pagesWithReceivedPage = state.pages.set(
                receivedPage.id, receivedPage
            )
            return {
                ...state,
                isRequesting: false,
                pages: pagesWithReceivedPage,
            }
        case APP_ACTION_TYPES.PAGE_NOT_FOUND:
            return {
                ...state,
                isRequesting: false
            }
        case APP_ACTION_TYPES.PAGE_ACTION:
            const { pageId, pageAction } = action.payload
            const pageBeforeAction = state.pages.get(pageId)
            const pageAfterAction = PageReducer(pageBeforeAction, pageAction)
            const pagesAfterAction = state.pages.set(
                pageId, pageAfterAction
            )
            return {
                ...state,
                pages: pagesAfterAction
            }
        default:
            return state
    }
}


/////////
/////////


export default App
