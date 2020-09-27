


const defaultInitialAppState = {
    pages: null,
    isRequesting: false,
    isCms: false
}

let overrideInitialAppState = {}

export const setInitialAppState = (appState) => {
    overrideInitialAppState = appState
}

export const getInitialAppState = () => ({
    ...defaultInitialAppState,
    ...overrideInitialAppState
})
