import "regenerator-runtime/runtime.js"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { defaultOptions } from './util/options'
import { setInitialAppState } from './redux/initialState'
import Body from './body'
import { initStore } from './redux/store'


///////////
///////////


const runApp = async (options={}, preloadedPages=null) => {
    //Merge with default options
    options = {
        ...defaultOptions,
        ...options
    }
    //Set 'isCms' in initial app state.
    setInitialAppState({ 
        isCms: options.isCms,
        pages: preloadedPages
    })
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
    //Extract components from options.
    const { header: Header, footer: Footer } = options.components
    //Define App
    const App = () => (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Body options={options} />
                <Footer />
                { getCmsOverlay() }
            </BrowserRouter>
        </Provider>
    )
    const rootElement = (
        document.getElementById("blux-app")
    )
    //Render App
    ReactDOM.render(
        <App />, 
        rootElement
    )
}


//////////////
//////////////


export default runApp