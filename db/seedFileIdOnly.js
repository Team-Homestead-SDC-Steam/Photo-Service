// Placeholder for seeding script that only pushes the IDs values, in case all the other data can be extrapolated from that

const fs = require('fs');
let {videos} = require('./videoData.js')
let {pictures} = require('./imageData.js');

const rnd = n => Array.isArray(n) ? n[rnd(n.length) - 1] : Math.floor(Math.random() * n) + 1;

// ** fix source data
videos = videos.map( video => video.id.videoId);
pictures = pictures.map( picture => `${picture.public_id}.${picture.format}`)

const generateGame = (id) => 
  `{"id":${id}, "assets":[{"mediaType":"video","mediaId":"${rnd(videos)
  }",{"mediaType":"video","mediaId":"${rnd(videos)
  }",{"mediaType":"carouselPhoto","mediaId":"${rnd(pictures)
  }",{"mediaType":"carouselPhoto","mediaId":"${rnd(pictures)
  }",{"mediaType":"carouselPhoto","mediaId":"${rnd(pictures)
  }",{"mediaType":"carouselPhoto","mediaId":"${rnd(pictures)
  }",{"mediaType":"carouselPhoto","mediaId":"${rnd(pictures)
  }",{"mediaType":"carouselPhoto","mediaId":"${rnd(pictures)
  }",{"mediaType":"carouselPhoto","mediaId":"${rnd(pictures)}"}]}`;

const saveGameData = async (count, chunkSize = 2000) => {
  let path = './assetsId.dat';
  let chunk = '';

  if (fs.existsSync(path)) fs.unlinkSync(path);
  let gameStream = fs.createWriteStream(path);

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

saveGameData(10000000);
