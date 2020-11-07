import 'regenerator-runtime/runtime.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { defaultOptions } from './util/options'
import { setInitialAppState } from './redux/initialState/app'
import Body from './body'
import { initStore } from './redux/store'
import { registerPages } from './page'
import { registerBlocks } from './block'

const runApp = async (options = {}, preloadedPages = null) => {
	// Merge with default options
	options = {
		...defaultOptions,
		...options
	}
	// Set 'isCms' in initial app state.
	const pagesOverride = preloadedPages ? { preloadedPages } : {}
	setInitialAppState({
		isCms: options.isCms,
		...pagesOverride
	})
	// Register pages and blocks.
	await registerPages(options.pages, options.isCms)
	await registerBlocks(options.blocks, options.isCms)
	// Create store.
	const store = initStore(
		options.reducer,
		options.preloadedState,
		options.isDev
	)
	// Getters
	const getCmsOverlay = () => (
		options.isCms ?
			(options.cmsOverlay ? options.cmsOverlay : null) :
			null
	)
	// Extract components from options.
	const { header: Header, footer: Footer } = options.components
	// Define App
	const App = () => (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<Body options={options} />
				<Footer />
				{getCmsOverlay()}
			</BrowserRouter>
		</Provider>
	)
	const rootElement = (
		document.getElementById('blux-app')
	)
	// Render App
	ReactDOM.render(
		<App />,
		rootElement
	)
}

export default runApp
