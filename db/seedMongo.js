var fs = require('fs');
const {db, getMedia, Game, createGame, deleteAllGames} = require('../db/index.js');

let path = '../assets.dat';
let chunk = '';

const saveGameData = async () => {

    let chunkString = '';
    let chunkArray = [];
    let count = 0;

    if (await !fs.existsSync(path)) {
        console.log ('Data file does not exist. Run "seedFile.js before importing.');
    }

    await Game.deleteMany()
    const startTime = Date.now();
    let gameStream = await fs.createReadStream(path);
    gameStream.setEncoding('utf8');

    gameStream.on('data', chunk => {
        gameStream.pause();
        chunkString += chunk; // add to end
        chunkArray = chunkString.split('\n') // make json sets to insert
        if(chunkString.slice(-2) != '\n') chunkString = chunkArray.pop(); // save extra text for next time
        // let chunkTime = Date.now();
        // console.log (`Inserting records ${count}-${count += chunkArray.length}`)
        // count += chunkArray.length;
        Game.insertMany(chunkArray.map( jsonText => JSON.parse(jsonText)))
        .then(function(){ 
            // console.log(`Completed in ${ (Date.now() - chunkTime) / 1000} seconds`)
            gameStream.resume();
        }).catch(function(error){ 
            console.log(error)      // Failure 
        }); 

    });
      
    gameStream.on('open', () => {
    console.log('Stream opened...');
    });
    
    gameStream.on('end', () => {
    console.log(`Seeded ${count} records. Operation took ${ (Date.now() - startTime) / 1000} seconds.`) 
    });

}




const generateGame = (id) => {
  let str = `{"id":${id}, "assets":[`;
  str += generateVideos(2) + ',';
  str += generatePhotos(6);
  return str += ']}' 
}

const seedGameDataOld = async (count, chunkSize = 2000) => {
  let path = './assets.dat';
  let chunk = '';

    if (!fs.existsSync(path)) {
        console.log ('Data file does not exist. Run "seedFile.js before importing.');
    }
    let gameStream = fs.createReadStream(path);

  const startTime = Date.now();
  for (let i = 1; i <= count; i++) {
    chunk += `${generateGame(i)}\n`
    if (i % chunkSize === 0 || i === count) {
      if (!gameStream.write(chunk) ) {
        await new Promise(resolve => gameStream.once('drain', resolve));
        chunk = '';
      }
    }
  }
  console.log(`Seeded ${count} records. Operation took ${ (Date.now() - startTime) / 1000} seconds chunked at ${chunkSize}.`) 
  gameStream.end()
}

saveGameData();
