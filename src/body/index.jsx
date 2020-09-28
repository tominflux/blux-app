import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { readPage } from '../api/page'
import APP_ACTIONS from '../redux/actions/app'
import Page from '../page'

const Body = ({ options }) => {
    //Hooks
    const dispatch = useDispatch()
    const isRequesting = useSelector(state => state.App.isRequesting)
    const pages = useSelector(state => state.App.pages)
    const location = useLocation()
    //Getters
    const getPageId = () => location.pathname
    //Constants
    const LoadingComponent = options.components.loading
    const NotFoundComponent = options.components.notFound
    const pageId = getPageId()
    const pageProps = pages.get(pageId)
    const pageReceived = pages.has(pageId)
    //Effects
    // - Request Page
    React.useEffect(() => {
        const requestPage = async () => {
            //Dispatch fetch action
            const fetchAction = APP_ACTIONS.fetchPage()
            dispatch(fetchAction)
            try {
                //Attempt to read page
                const receivedPage = await readPage(pageId)
                //Dispatch receive page action
                const receivePageAction = APP_ACTIONS.receivePage(receivedPage)
                dispatch(receivePageAction)
            } catch (err) {
                console.error(err.message)
                //Dispatch page not found action
                const pageNotFoundAction = APP_ACTIONS.pageNotFound()
                dispatch(pageNotFoundAction)
            }
        }
        requestPage()
    }, [])
    //Render
    if (isRequesting) {
        return <LoadingComponent />
    } else if (!pageReceived) {
        return <NotFoundComponent />
    } else {
        return <>
            <Page {...pageProps} />
            {/*<AppCmsUi />*/}
        </>
    }
}

export default Body
