import React from 'react'
import PropTypes from 'prop-types'
import Block from '../block'
import getBlockDispatchers from '../block/redux/util/getBlockDispatchers'
import getPageDispatchers from './redux/util/getPageDispatchers'
import { useDispatch, useSelector } from 'react-redux'

const pageMap = new Map()

// eslint-disable-next-line no-unused-vars
export const registerPages = async (pages, isCms) => {
	// Loop through supplied pages.
	for (const page of pages) {
		// Ensure page map hasn't already been given page type.
		if (pageMap.has(page.type)) {
			throw new Error(
				`Page type "${page.type}" has ` +
                'already been registered.'
			)
		}
		/*
		// Load page modules
		const loadedPage = {
			public: isCms ? null : await page.public(),
			cms: isCms ? await page.cms() : null,
			common: page.common()
		}
		*/
		const loadedPage = page
		// Add page to page map.
		pageMap.set(page.type, loadedPage)
	}
}

export const getPageMap = () => (
	new Map(pageMap)
)

export const getPage = (type) => {
	if (!pageMap.has(type)) {
		throw new Error(
			`Page type '${type}' does not exist.`
		)
	}
	return pageMap.get(type)
}

// eslint-disable-next-line no-unused-vars
const Page = ({ id, type, className, blocks, PageCmsUi, ...pageProps }) => {
	// Redux
	const { isCms } = useSelector(state => state.App)
	const dispatch = useDispatch()
	// Getters
	const renderBlocks = (blocks) => blocks.valueSeq().map(
		(blockProps, index) => {
			const pageId = id
			const blockDispatchers = isCms ?
				getBlockDispatchers(
					dispatch,
					blockProps,
					pageId
				) : {}
			return (
				<Block
					key={index}
					pageId={pageId}
					{...blockProps}
					{...blockDispatchers}
				/>
			)
		}
	)
	// Constants
	const pageMap = getPageMap()
	const page = pageMap.get(type)
	if (!pageMap.has(type)) {
		throw new Error(
			'Page type \'' + type + '\' ' +
            'does not exist.'
		)
	}
	const PageComponent = page.component
	const pageDispatchers = isCms ?
		getPageDispatchers(dispatch, page, id) : {}
	// Render
	return (
		<PageComponent
			className={className}
			{...pageProps}
			{...pageDispatchers}
		>
			{renderBlocks(blocks)}
			{/*
            <PageCmsUi
                {...pageProps}
                {...pageDispatchers}
            />
            */}
		</PageComponent>
	)
}

Page.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	className: PropTypes.string,
	PageCmsUi: PropTypes.func,
	blocks: PropTypes.object
}

Page.defaultProps = {
	className: null
}

export default Page
