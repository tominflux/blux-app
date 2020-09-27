import { Map } from 'immutable'

const defaultInitialAppState = {
    pages: Map(),
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
