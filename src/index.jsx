import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { defaultOptions } from './util/options'
import { setInitialAppState } from './redux/initialState'
import Body from './body'
import { initStore } from './redux/store'


///////////
///////////


const runApp = async (options={}) => {
    //Merge with default options
    options = {
        ...defaultOptions,
        ...options
    }
    //Set 'isCms' in initial app state.
    setInitialAppState({ isCms: options.isCms })
    //Create store.
    const store = initStore(
        options.reducer,
        options.preloadedState,
        options.isDev
    )
    //Getters
    const getCmsOverlay = () => (
        options.isCms ?
            options.cmsOverlay : null
    )
    //Define App
    const App = () => (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Body />
                <Footer />
                { getCmsOverlay() }
            </BrowserRouter>
        </Provider>
    )
    const rootElement = (
        document.getElementyById("blux-app")
    )
    //Render App
    ReactDOM.render(
        App, rootElement
    )
}


//////////////
//////////////


import("../src").then(
    appInstance => runApp(appInstance)
)
