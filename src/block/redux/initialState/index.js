import { genId } from '../../../util/id'

/**
 * Generate an initial state for a block.
 */
const genBlockState = (type, props) => ({
	id: genId(),
	type,
	...props
})

export default genBlockState
