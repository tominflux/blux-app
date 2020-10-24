
export const pageIdToPath = (pageId) => (
	(pageId === '/') ?
		'index' : pageId
) + '.json'
