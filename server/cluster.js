const os = require('os')

const init = (cluster) => {
    let clusters = os.cpus().length;
    if (!process.argv.includes('cluster')) return true; 
    if (cluster.isMaster) {
        console.log(`Clustering ${clusters} cores`)
        os.cpus().forEach(cluster.fork);
        cluster.on('exit', (worker) => {
            console.log(`Cluster ${worker.id} has failed. Attempting to restore.`)
            cluster.fork()
        })
        return false;
    }
    return true;
}

module.exports.init = init;
