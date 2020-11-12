import React from 'react'

export const defaultOptions = {
	// Is Development Instance?
	isDev: false,
	// CMS
	cms: () => null,
	// Components
	components: {
		header: () => null,
		footer: () => null,
		loading: () => <p>Loading...</p>,
		notFound: () => <p>404</p>,
	},
	// Pages
	pages: [],
	// Blocks
	blocks: [],
	// Redux
	reducer: (state) => state,
	preloadedState: {},
}
