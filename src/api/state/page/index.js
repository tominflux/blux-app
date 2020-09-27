import * as path from 'path'

export const PAGE_STATE_API_PATH = '/__state/page'

export const readPage = async (pagePath='/') => {
    const requestPath = path.join(
        PAGE_STATE_API_PATH,
        pagePath
    )
    const response = await fetch(requestPath)
    //404
    //Page state not found.
    if (!response.ok) {
        const msg = `Could not load page state at ${pagePath}.`
        alert(msg)
        throw new Error(msg)
    }
    //500
    //Page state response content type is not JSON.
    const contentType = response.headers["Content-Type"]
    if (contentType !== "application/json") {
        const msg = (
            `Unexpected content-type from page state response [${pagePath}].\n` +
            `Expected 'application/json', found '${contentType}'.`
        )
        alert(msg)
        throw new Error(msg)
    }
    const page = await response.json()
    return page
}