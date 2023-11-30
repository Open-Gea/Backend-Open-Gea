import NodeClam from "clamscan";


export const scanOptions : NodeClam.Options = {
    removeInfected: true, // Removes files if they are infected
    debugMode: true, // This will put some debug info in your js console
    scanRecursively: true, // Choosing false here will save some CPU cycle
    clamscan: {
        scanArchives: true, // If true, scan archives (ex. zip, rar, tar, dmg, iso, etc...)
        active: true // If true, this module will consider using the clamscan binary
    },
}
