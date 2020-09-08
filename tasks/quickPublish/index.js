const { runCmd } = require("../util/runCmd")
const fs = require("fs-extra")

const incrementVersion = async () => {
    //Read package data.
    const packageText = (
        (await fs.readFile("./package.json"))
        .toString()
    )
    const packageData = JSON.parse(packageText)
    //Update package data.
    const version = packageData.version
    const versionParts = version.split(".").map(
        versionPart => parseInt(versionPart)
    )
    const minor = versionParts[2]
    const updatedMinor = minor + 1
    const updatedVersionParts = [
        versionParts[0],
        versionParts[1],
        updatedMinor
    ]
    const updatedVersion = (
        `${updatedVersionParts[0]}.` +
        `${versionParts[1]}.` +
        `${updatedMinor}`
    )
    const updatedPackageData = {
        ...packageData,
        version: updatedVersion
    }
    const updatedPackageText = JSON.stringify(
        updatedPackageData, null, '\t'
    )
    //Save package data.
    await fs.writeFile(
        "./package.json",
        updatedPackageText
    )
}

const quickPublish = async () => {
    await runCmd("npm run build", console)
    await incrementVersion()
    await runCmd("npm publish", console)
}

quickPublish()