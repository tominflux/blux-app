import { Map } from 'immutable'
import { getBlock } from '../../../block'
import { getPage } from '../..'

const deserialiseBlocks = (serialisedBlocks) => Map(
	serialisedBlocks.map((serialisedBlock) => {
		const { id, type, ...otherProps } = serialisedBlock
		const deserialise = getBlock(type).deserialise
		if (!deserialise) {
			return [serialisedBlock.id, serialisedBlock]
		}
		const block = {
			...deserialise(otherProps),
			id, 
			type,
		}
		return [block.id, block]
	})  
)

const deserialisePage = (serialisedPage) => {
	const { 
		id, 
		type, 
		blocks: serialisedBlocks,
		...otherProps
	} = serialisedPage
	const blocks = deserialiseBlocks(serialisedBlocks)
	const deserialise = getPage(type).deserialise
	if (!deserialise) {
		return { id, type, blocks }
	}
	return {
		...deserialise(otherProps),
		id,
		type,
		blocks
	}
}

export default deserialisePage
