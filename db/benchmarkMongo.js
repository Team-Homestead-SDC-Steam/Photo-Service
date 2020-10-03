let {db, createGame, readGame} = require('./index.js');

const rnd = n => Array.isArray(n) ? n[rnd(n.length) - 1] : Math.floor(Math.random() * n) + 1;

const testReads = (records = 50000) => {

  // if you've seeded the file with fewer than 10m records, pass this number as a parameter
  const maxId = process.argv[2] || 10000000;

  // there are only so many promises JS can keep track of, I guess
  if (records > 50000) return console.log('Max # of records for this function is 50000.') 

  // build the seed queries (already tried with a bunch of different data slices)
  const searchIds = Array(records).fill(0).map( id => rnd(maxId)) 

  const startTime = Date.now();
  // start all the queries, which return promises
  const readPromises =  searchIds.map( id => readGame(id)  ) 

  Promise.all(readPromises) 
    .then ( (games) => {
      const finalTime = (Date.now() - startTime) / 1000;
      const perRecord = finalTime / records
      // console.log( typeof games, games)
      console.log(`Validating: last record of search IDs = ${searchIds[records-1]
                    }; last record of game data =  ${ games[records-1].id
                    }\n${ games.length } game IDs queried & returned in ${ finalTime
                    } seconds.\nAverage per record:  ${ Math.round(perRecord * 100000) / 1000
                    }ms. | rpm: ${ Math.round(60 / perRecord ) } | rps: ${ Math.round(1 / perRecord ) }`); 
  });
}

testReads();