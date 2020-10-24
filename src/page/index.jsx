import React from 'react'
import PropTypes from 'prop-types'
import Block from '../block'
import { getBlockDispatchers } from '../block/redux/actions'
import { getPageDispatchers } from './redux/actions'
import { useDispatch } from 'react-redux'


//////////////
//////////////


const pageMap = new Map()

export const registerPages = (pages) => {
	//Loop through supplied pages.
	for (const page of pages) {
		//Ensure page map hasn't already been given page type.
		if (pageMap.has(page.type)) {
			throw new Error(
				`Page type "${page.type}" has ` +
                'already been registered.'
			)
		}
		//Add page to page map.
		pageMap.set(page.type, page)
	}
}

export const getPageMap = () => (
	new Map(pageMap)
)


//////////////
//////////////


// eslint-disable-next-line no-unused-vars
const Page = ({ id, type, className, blocks, PageCmsUi, ...pageProps }) => {
	// Redux
	const dispatch = useDispatch()
	// Getters
	const renderBlocks = (blocks) => blocks ? blocks.map(
		(blockProps, index) => {
			const pageId = id
			const blockDispatchers = getBlockDispatchers(
				blockProps,
				pageId
			)
			return (
				<Block
					key={index}
					pageId={pageId}
					{...blockProps}
					{...blockDispatchers}
				/>
			)
		}
	) : null
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
	const pageDispatchers = getPageDispatchers(page, id, dispatch)
	//Render
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
	blocks: PropTypes.arrayOf(PropTypes.object)
}

Page.defaultProps = {
	className: null
}

export default Page
