const { getBlockDispatchers } = require("../block/redux/actions")
const { getPageDispatchers } = require("./redux/actions")


//////////////
//////////////


const Page = (props) => {
    //Functions
    const renderBlocks = (blocks) => blocks.map(
        (blockProps, index) => {
            const pageId = props.id
            const blockDispatchers = getBlockDispatchers(
                blockProps, 
                pageId
            )
            return (
                <Block 
                    key={index}
                    pageId={pageId}
                    {...blockProps}  
                    {...blockDispatchers}
                />
            )
        }
    )
    //Constants
    const pageMap = getPageMap()
    const page = pageMap.get(props.type)
    if (!pageMap.has(pageType)) {
        throw new Error(
            "Page type '" + pageType + "' " + 
            "does not exist."
        )
    }
    const PageComponent = page.component
    const { 
        blocks, 
        PageCmsUi,
        ...pageProps 
    } = props
    const pageDispatchers = getPageDispatchers(page, props.id)
    //Render
    return (
        <PageComponent
            className={props.className}
            {...pageProps}
            {...pageDispatchers}
        >
            { renderBlocks(blocks) }
            <PageCmsUi 
                {...pageProps}
                {...pageDispatchers}
            />
        </PageComponent>
    )
}

export default Page