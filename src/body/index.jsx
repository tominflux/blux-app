import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Body = ({ options }) => {
    //Hooks
    const isRequesting = useSelector(state => state.App.isRequesting)
    const pages = useSelector(state => state.App.pages)
    const location = useLocation()
    //Getters
    const getPageId = () => {
        const pathname = location.pathname
        return (
            (pathname === "/") ?
                "index" :
                pathname.replace(/^\/|\/$/g, '')
        )
    }
    //Effects
    // - Request Page
    React.useEffect(() => {

    })
    //Constants
    const LoadingComponent = options.components.loading
    const NotFoundComponent = options.components.notFound
    const pageId = getPageId()
    const pageProps = pages.get(pageId)
    const pageNotFoundYet = (pageProps === null)
    //Render
    if (isRequesting) {
        return <LoadingComponent />
    } else if (pageNotFoundYet) {
        return <NotFoundComponent />
    } else {
        return <>
            <Page {...pageProps} />
            <AppCmsUi />
        </>
    }
}

export default Body
