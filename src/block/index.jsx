import React from 'react'
import { useSelector } from 'react-redux'
import './styles.css'
// import { createBlockAction } from './redux/actions'


//////////////
//////////////


const blockMap = new Map()

export const registerBlocks = (blocks) => {
    //Loop through supplied blocks.
    for (const block of blocks) {
        //Ensure block has a type.
        if (!block.type) {
            throw new Error(
                `Block type cannot be falsey. block.type = ${block.type}`
            )
        }
        //Ensure block map hasn't already been given block type.
        if (blockMap.has(block.type)) {
            throw new Error(
                `Block type "${block.type}" has ` +
                `already been registered.`
            )
        }
        //Add block to block map.
        blockMap.set(block.type, block)
    }
}

export const getBlockMap = () => (
    new Map(blockMap)
)


//////////////
//////////////


const Block = (props) => {
    // Redux
    const { isCms } = useSelector((state) => state.App)
    // Computations
    const blockMap = getBlockMap()
    if (!blockMap.has(props.type)) {
        console.error(
            "Block type '" + props.type + "' does not exist."
        )
        return (
            <div className="blux-block">
                <p>Invalid Block</p>
            </div>
        )
    }
    const block = blockMap.get(props.type)
    const BlockComponent = isCms ?
        block.component.cms : block.component.public
    // Render
    return (<>
        <BlockComponent {...props} />
    </>)
}

export default Block


//////////////
//////////////
