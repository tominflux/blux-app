import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getPageById } from '../util/pages'

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
    const getLoadingPage = () => {
        const LoadingComponent = options.components.loading
        return <LoadingComponent />
    }
    const getNotFoundPage = () => {
        const NotFoundComponent = options.components.notFound
        return <NotFoundComponent />
    }
    const getCurrentPage = () => {
        const pageId = getPageId()
        const pageProps = getPageById(pageId, pages)
        const pageNotFoundYet = (pageProps === null)
        if (isRequesting) {
            return getLoadingPage()
        } else if (pageNotFoundYet) {
            return getNotFoundPage()
        } else {
            return (<>
                <Page
                    {...pageProps}
                />
                <AppCmsUi />
            </>)
        }
    }
    //Constants
    const isLoading = (pages === null)
    //Render
    if (isLoading) {
        return getLoadingPage()
    } else {
        return getCurrentPage()
    }
}

export default Body
