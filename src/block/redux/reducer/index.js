import { getBlockMap } from "../.."
import { genId } from "../../../util/id"


/**
 * Processes block actions on a block state.
 * @param {*} blockState 
 * @param {*} blockAction 
 */
const BlockReducer = (
    blockState, blockAction
) => {
    const blockMap = getBlockMap()
    const blockType = blockState.type
    const blockReducer = blockMap.get(blockType).redux.reducer
    return blockReducer(blockState, blockAction)
}

export default BlockReducer
