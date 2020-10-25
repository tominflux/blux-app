import { getBlock } from '../..'

/**
 * Processes block actions on a block state.
 * @param {*} blockState 
 * @param {*} blockAction 
 */
const BlockReducer = (blockState, blockAction) => {
	const { id, type } = blockState
	const block = getBlock(type)
	// Ensure block has a reducer.
	if (!block.redux || !block.redux.reducer) {
		throw new Error(
			'Attempted to reduce block action on block ' +
			`{id: ${id}, type: ${type}, ...} ` +
			'but block has no associated reducer.'
		)
	}
	return block.redux.reducer(blockState, blockAction)
}

export default BlockReducer
