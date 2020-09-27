import React from 'react'

export const defaultOptions = {
    //Is Development Instance?
    isDev: false,
    //CMS
    isCms: false,
    cmsOverlay: () => null,
    //Components
    header: () => null,
    footer: () => null,
    loading: () => <p>Loading...</p>,
    notFound: () => <p>404</p>,
    //Redux
    reducer: (state) => state,
    preloadedState: {}
}