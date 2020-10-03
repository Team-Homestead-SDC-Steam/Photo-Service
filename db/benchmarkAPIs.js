const fetch = require('node-fetch');
let {db, createGame, readGame} = require('./index.js');

const API_PATH = 'http://localhost:3004/api/media/';

const rnd = n => Array.isArray(n) ? n[rnd(n.length) - 1] : Math.floor(Math.random() * n) + 1;

const testReads = (records = 5000) => {

  // if you've seeded the file with fewer than 10m records, pass this number as a parameter
  const maxId = process.argv[2] || 10000000;

  // there are only so many promises JS can keep track of, I guess
  if (records > 50000) return console.log('Max # of records for this function is 50000.') 

  // build the seed queries (already tried with a bunch of different data slices)
  const searchIds = Array(records).fill(0).map( id => rnd(maxId/2) + maxId/2) 

  let startTime = Date.now();
  // start all the queries, which return promises
  const readPromises =  searchIds.map( id => fetch(`${API_PATH}${id}`));
  console.log(`Promises generated: ${(Date.now() - startTime) / 1000}`)
  startTime = Date.now();

  Promise.all(readPromises) 
    .then ( (games) => games[records - 1].json() )
    .then ( (lastGame) =>  {
      console.log(`last game json: ${lastGame.id}`);
          const finalTime = (Date.now() - startTime) / 1000;
          const perRecord = finalTime / records
          console.log(`Validating: last record of search IDs = ${searchIds[records-1]
          }; last record of game data =  ${lastGame.id
          }\n${ records } game IDs queried & returned in ${ finalTime
          } seconds.\nAverage per record:  ${ perRecord * 1000
          }ms. | rpm: ${ Math.round(60 / perRecord ) } | rps: ${ Math.round(1 / perRecord ) }`); 
        })
}

testReads();
