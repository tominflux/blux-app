
export const defaultOptions = {
    //Is Development Instance?
    isDev: false,
    //CMS
    isCms: false,
    cmsOverlay: () => null,
    //Components
    header: () => null,
    footer: () => null,
    //Redux
    reducer: (state) => state,
    preloadedState: {}
}