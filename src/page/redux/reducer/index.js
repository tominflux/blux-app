import BlockReducer from '../../../block/redux/reducer'
import PAGE_ACTION_TYPES from '../actionTypes'

const PageReducer = (pageState, pageAction) => {
	switch (pageAction.type) {
	case PAGE_ACTION_TYPES.BLOCK_ACTION: {
		const { blockId, blockAction } = pageAction.payload
		const blockState = pageState.blocks.get(blockId)
		const nextBlockState = BlockReducer(blockState, blockAction)
		const blocks = pageState.blocks.set(blockId, nextBlockState)
		return { ...pageState, blocks }
	}
	default: return pageState
	}
}

export default PageReducer
