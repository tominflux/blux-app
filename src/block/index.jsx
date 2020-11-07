import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'
// import { createBlockAction } from './redux/actions'


// ////////////
// ////////////


const blockMap = new Map()

export const registerBlocks = async (blocks, isCms) => {
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
		// Load block modules
		const blockPublic = isCms ? null : (await block.public()).default
		const blockCms = isCms ? (await block.cms()).default : null
		const blockCommon = (await block.common()).default
		// Build loaded block.
		const loadedBlock = {
			type: block.type,
			component: isCms ? blockCms.component : blockPublic.component,
			redux: isCms ? (blockCms.redux ?? null) : null,
			metadata: {
				...(isCms ? (blockCms.metadata ?? {}) : {}),
				...(blockCommon.metadata ?? {}),
			},
			deserialise: blockCommon.deserialise ?? null
		}
		// Add block to block map.
		blockMap.set(block.type, loadedBlock)
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
	console.log(block)
	const BlockComponent = block.component
	console.log('otherProps', {...otherProps})
	// Render
	return (<>
		<BlockComponent {...otherProps} />
	</>)
}

Block.propTypes = {
	type: PropTypes.string.isRequired
}

export default Block
