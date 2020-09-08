const child = require("child_process")

const runCmd = (cmd, cnsl) => (
    new Promise((resolve, reject) => {
        const callback = (error, stdout, stderr) => {
            if (stdout) cnsl.log(stdout)
            if (stderr) cnsl.log(stderr)
            if (error) cnsl.error(error)
        }
        const parcelProcess = child.exec(
            cmd, callback
        )
        parcelProcess.addListener("error", reject)
        parcelProcess.addListener("exit", resolve)
    })
)

exports.runCmd = runCmd