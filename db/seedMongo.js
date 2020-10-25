var fs = require('fs');

const {mongoose, gameSchema, Game} = require('./connection.js');
const db = mongoose.connection;
db.on('open', () => { insertToMongo() });

const insertToMongo = async (status = 50) => {
    console.log('beginning insert...');
    let leftoverText = '';
    let path = './assets.dat';
    let count = 0;
    let inserts = 0;
    let insertQueue = [];

    console.log(`looking for seed file at: ${path}`)

    if (!fs.existsSync(path)) {
        console.log ('Assets.dat does not exist. Run "seedFile.js before importing.');
        db.close();
        return false;
    } 

    // let leftInDb = await Game.estimatedDocumentCount();
    // if (leftInDb > 0) await db.dropCollection('games');

    let gameStream = fs.createReadStream(path);
    gameStream.setEncoding('utf8');

    const startTime = Date.now();

    gameStream.on('end', async () => {
        await insertOneArrayToMongo(insertQueue)
        count += insertQueue.length;
        console.log(`Attempted to seed ${count} records. Operation took ${ (Date.now() - startTime) / 1000} seconds.`) 
        const actualInserted = await Game.estimatedDocumentCount();
        console.log(`Actually seeded ${actualInserted} records.`) 
        console.log(`Error count: ${keyErrorCount} (these are probably id/key duplicates)`)
        db.close();
    });

    gameStream.on('data', async (chunk) => {
        chunk = (leftoverText + chunk).split('\n'); // prepend any partial game from previous chunk
        leftoverText = chunk.pop();
        insertQueue = insertQueue.concat(chunk.map(json => JSON.parse(json)));
        if (insertQueue.length > 950) {
            try{

            } catch() {

            }
            setTimeout( () => {insertOneArrayToMongo(insertQueue) }, 5000);
            count += insertQueue.length;
            if (++inserts % status === 0) console.log(`Inserted ${count} records (${ (Date.now() - startTime) / 1000} )`) 
            insertQueue = [];
        }
    });
}

let keyErrorCount = 0;
const insertOneArrayToMongo = async (array) => {
     try {
         Game.collection.insertMany(array, { ordered: false })
     } catch(err) {
         keyErrorCount++;
    //     // ignore duplicate key errors
     }
    
}