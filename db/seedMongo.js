var fs = require('fs');

const mongoose = require('mongoose');
const dev = true; // FLIP FOR DEV/PRODUCTION
const connectDomain = dev ? 'localhost' : 'mongo';
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
mongoose.connect(`mongodb://${connectDomain}/api`, connectOptions);
const db = mongoose.connection;
db.on('error', (err) => { console.log('mongoose connection error: ', err) });
db.once('open', () => insertToMongo() );
const assetSchema = mongoose.Schema({ mediaType: String, url: String, thumbnail: String })
const gameSchema = mongoose.Schema({ id: { type: Number, unique: true }, assets: [assetSchema] })
const Game = mongoose.model('Game',gameSchema, 'games')


const insertToMongo = async (status = 50) => {
    let leftoverText = '';
    let path = '../assets.dat';
    let count = 0;
    let inserts = 0;
    let insertQueue = [];

    if (!fs.existsSync(path)) {
        console.log ('Data file does not exist. Run "seedFile.js before importing.');
        db.close();
        return false;
    } 

    let leftInDb = await Game.estimatedDocumentCount();
    if (leftInDb > 0) await db.dropCollection('games');

    let gameStream = fs.createReadStream(path);
    gameStream.setEncoding('utf8');

    const startTime = Date.now();

    gameStream.on('end', async () => {
        await insertOneArrayToMongo(insertQueue)
        count += insertQueue.length;
        console.log(`Attempted to seed ${count} records. Operation took ${ (Date.now() - startTime) / 1000} seconds.`) 
        const actualInserted = await Game.estimatedDocumentCount();
        console.log(`Actually seeded ${actualInserted} records.`) 
        db.close();
    });

    gameStream.on('data', async (chunk) => {
        chunk = (leftoverText + chunk).split('\n'); // prepend any partial game from previous chunk
        leftoverText = chunk.pop();
        insertQueue = insertQueue.concat(chunk.map(json => JSON.parse(json)));
        if (insertQueue.length > 950) {
            insertOneArrayToMongo(insertQueue);
            count += insertQueue.length;
            if (++inserts % status === 0) console.log(`Inserted ${count} records (${ (Date.now() - startTime) / 1000} )`) 
            insertQueue = [];
        }
    });
}

const insertOneArrayToMongo = async (array) => {
    await Game.collection.insertMany(array)
}