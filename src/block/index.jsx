import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import './styles.css'
// import { createBlockAction } from './redux/actions'


// ////////////
// ////////////


const blockMap = new Map()

export const registerBlocks = (blocks) => {
	// Loop through supplied blocks.
	for (const block of blocks) {
		// Ensure block has a type.
		if (!block.type) {
			throw new Error(
				`Block type cannot be falsey. block.type = ${block.type}`
			)
		}
		// Ensure block map hasn't already been given block type.
		if (blockMap.has(block.type)) {
			throw new Error(
				`Block type "${block.type}" has ` +
                'already been registered.'
			)
		}
		// Add block to block map.
		blockMap.set(block.type, block)
	}
}

export const getBlockMap = () => (
	new Map(blockMap)
)

export const getBlock = (type) => {
	if (!blockMap.has(type)) {
		throw new Error(
			`Block type '${type}' does not exist.`
		)
	}
	return blockMap.get(type)
}

const Block = ({type, ...otherProps}) => {
	// Redux
	const { isCms } = useSelector((state) => state.App)
	// Computations
	const blockMap = getBlockMap()
	if (!blockMap.has(type)) {
		console.error(
			'Block type \'' + type + '\' does not exist.'
		)
		return (
			<div className="blux-block">
				<p>Invalid Block</p>
			</div>
		)
	}
	const block = blockMap.get(type)
	const BlockComponent = isCms ?
		block.component.cms : block.component.public
	// Render
	return (<>
		<BlockComponent {...otherProps} />
	</>)
}

Block.propTypes = {
	type: PropTypes.string.isRequired
}

export default Block
