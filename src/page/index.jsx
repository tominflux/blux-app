import React from 'react'
import Block from '../block'
const { getBlockDispatchers } = require("../block/redux/actions")
const { getPageDispatchers } = require("./redux/actions")


//////////////
//////////////


const pageMap = new Map()

export const registerPages = (pages) => {
    //Loop through supplied pages.
    for (const page of pages) {
        //Ensure page map hasn't already been given page type.
        if (pageMap.has(page.type)) {
            throw new Error(
                `Page type "${page.type}" has ` +
                `already been registered.`
            )
        }
        //Add page to page map.
        pageMap.set(page.type, page)
    }
}

export const getPageMap = () => (
    new Map(pageMap)
)


//////////////
//////////////


const Page = (props) => {
    //Getters
    const renderBlocks = (blocks) => blocks ? blocks.map(
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
    ) : null
    //Constants
    const pageMap = getPageMap()
    const page = pageMap.get(props.type)
    if (!pageMap.has(props.type)) {
        throw new Error(
            "Page type '" + props.type + "' " +
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
            {renderBlocks(blocks)}
            {/*
            <PageCmsUi
                {...pageProps}
                {...pageDispatchers}
            />
            */}
        </PageComponent>
    )
}

export default Page
