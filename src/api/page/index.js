import * as path from 'path'
import { pageIdToPath } from '../../util/page'

export const PAGE_STATE_API_PATH = '/__state/page'

export const readSerialisedPage = async (pageId = '/') => {
	//
	const pagePath = pageIdToPath(pageId)
	const requestPath = path.join(
		PAGE_STATE_API_PATH, pagePath
	)
	const response = await fetch(requestPath)
	// 404
	// Page state not found.
	if (!response.ok) {
		const msg = `Could not load page state at ${pageId}.`
		alert(msg)
		throw new Error(msg)
	}
	// 500
	// Page state response content type is not JSON.
	const contentType = response.headers.get('Content-Type')
	if (!contentType.includes('application/json')) {
		const msg = (
			`Unexpected content-type from page state response [${pageId}].\n` +
            `Expected 'application/json', found '${contentType}'.`
		)
		alert(msg)
		throw new Error(msg)
	}
	const page = await response.json()
	return page
}
