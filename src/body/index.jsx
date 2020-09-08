import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Body = (props) => {
    //Hooks
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
    const getCurrentPage = () => {
        const pageId = getPageId()
        const pageProps = getPageById(pageId, pages)
        if (pageProps === null) {
            return (
                <NotFoundPage />
            )
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