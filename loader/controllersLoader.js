require('reflect-metadata')
const path = require('path')
const fs = require('fs')

function loadAllControllers() {
    const controllers = []
    const directoryPath = path.join(__dirname, '../Controllers')

    // Read all files in Controllers directory
    const fileNames = fs.readdirSync(directoryPath)
    fileNames.forEach((file) => {
        if (file.endsWith('.js')) {
            const controllerName = file.split('.')
            const handlerName = Reflect.getMetadata(
                "name",
                controllerName[0].prototype,
            );

            console.log(handlerName)

            // const filesPath = path.join(__dirname, '../Controllers')
            // fs.open(`${filesPath}/${file}`, 'r+', (err, fileDescriptor) => {
            //     if (err) console.log(err)
            //     fs.readFile(fileDescriptor, (err, buffer) => {
            //         if (err) console.log(err)
            //         const fileContent=buffer.toLocaleString()
            //         // console.log(fileContent.matchAll(682))
            //     })
            // })
            controllers.push({
                controller: controllerName[0]
            })
        }
    })
    return controllers
    //     files.forEach((file) => {
    //         if (file.endsWith('.js')) {
    //             fs.open(`./Controllers/${file}`, "r+", (err, fd) => {
    //                 if (err) console.log(err)
    //                 fs.readFile(fd, (err, buffer) => {
    //                     if (err) console.log(err)
    //                     console.log(buffer.toString())
    //                 })
    //             })
    //         }
    //     })
    // })
}


module.exports = {loadAllControllers}