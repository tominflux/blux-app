

export const getPageById = (id, pages) => {
    const result = pages.filter(
        page => page.id === id
    )
    if (result.length === 0) {
        throw new Error(
            `Page with ID "${id}" doesn't exist.`
        )
    }
    return (
        (result.length > 0) ?
            result[0] : null
    )
}