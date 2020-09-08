import { genId } from "../../../util/id"


/**
 * Initial state for any abstract block.
 * (To be used as part of creating a realised state
 * for a non-abstract block.)
 */
export const blockInitialState = (type) => ({
    id: genId(),
    type
})

/**
 * Processes block actions on a block state.
 * @param {*} blockState 
 * @param {*} blockAction 
 */
export default function BlockReducer(
    blockState, blockAction
) {
    const blockMap = getBlockMap()
    const blockType = blockState.type
    const blockReducer = blockMap.get(blockType).redux.reducer
    return blockReducer(blockState, blockAction)
}