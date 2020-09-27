import APP_ACTION_TYPES from "../../actionTypes/app"


const fetchPage = () => ({
    type: APP_ACTION_TYPES.FETCH_PAGE,
    payload: {}
})

const receivePage = (receivedPage) => ({
    type: APP_ACTION_TYPES.RECEIVE_PAGE,
    payload: { receivedPage }
})

const pageAction = (pageId, pageAction) => ({
    type: APP_ACTION_TYPES.PAGE_ACTION,
    payload: { pageId, pageAction }
})


////////////
////////////


const APP_ACTIONS = {
    fetchPage,
    receivePage,
    pageAction
}

export default APP_ACTIONS