import { getBlockMap } from "../.."


/**
 * Creates an absolute action from a block action.
 * Block actions are relative to a given block.
 * Absolute actions on blocks require a page ID and block ID
 * to know which block in the app's state to update.
 * @param {*} pageId 
 * @param {*} blockId 
 * @param {*} blockAction 
 */
export const actualiseBlockAction = (
    pageId,
    blockId,
    blockAction
) => ({
    type: PAGE_ACTION,
    payload: {
        pageId,
        pageAction: {
            type: BLOCK_ACTION,
            payload: {
                blockId,
                blockAction
            }
        }
    }
})

/**
 * Get absolute action dispatchers for a block.
 * @param {*} blockProps 
 * @param {*} pageId 
 */
export const getBlockDispatchers = (blockProps, pageId) => {
    //Get block and block actions from block-map.
    const blockMap = getBlockMap()
    const block = blockMap.get(blockProps.type)
    //If block has no redux behaviour, return empty object.
    if (!block.redux) return {}
    //
    const blockActionFns = block.redux.actions
    //Build object with block's dispatchers by
    //looping through keys of block actions...
    let blockDispatchers = {}
    for (const key in blockActionFns) {
        //Extract block action.
        const blockActionFn = blockActionFns[key]
        //Build dispatcher from action.
        const blockDispatcher = (...params) => {
            const blockAction = blockActionFn(...params)
            const action = actualiseBlockAction(
                pageId, blockProps.id, blockAction
            )
            store.dispatch(action)
        }
        blockDispatchers = {
            ...blockDispatchers,
            [key]: blockDispatcher
        }
    }
    //Return copy.
    return { ...blockDispatchers }
}