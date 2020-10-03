const fs = require('fs');
let {videos} = require('./videoData.js')
let {pictures} = require('./imageData.js');

const rnd = n => Array.isArray(n) ? n[rnd(n.length) - 1] : Math.floor(Math.random() * n) + 1;

// ** fix source data
videos = videos.map( video => video.id.videoId);
pictures = pictures.map( picture => `${picture.public_id}.${picture.format}`)

const generateVideos = (count) => {
  let str = '';
  let randomVideo;
  for (let i=1; i<=count; i++) {
    randomVideo = rnd(videos);
    str += '{"mediaType":"video",';
    // str += `"url":"https://www.youtube.com/embed/${randomVideo.id.videoId}",`;
    // str += `"thumbnail":"${randomVideo.snippet.thumbnails.default.url}"}`;
    str += `"url":"https://www.youtube.com/embed/${randomVideo}",`;
    str += `"thumbnail":"https://i.ytimg.com/vi/${randomVideo}/default.jpg"}`;

    if(i!=count) str += ','; // add a comma to all but the last one
  }
  return str;
}

const generatePhotos = (count) => {
  let str = '';
  let randomPhoto;
  for (let i=1; i<=count; i++) { 
    randomPhoto = rnd(pictures);
    str += '{"mediaType":"carouselPhoto",';
    // str += '"url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/'
    // str += `${randomPhoto.public_id}.${randomPhoto.format}"}`;
    str += `"url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/${randomPhoto}"}`
    if(i!=count) str += ',';  // add a comma to all but the last one
  }
  return str;
}

const generateGame = (id) => {
  let str = `{"id":${id}, "assets":[`;
  str += generateVideos(2) + ',';
  str += generatePhotos(6);
  return str += ']}' 
}

const saveGameData = async (count, chunkSize = 2000) => {
  let path = './assets.dat';
  let chunk = '';

  if (fs.existsSync(path)) {
    console.log(`deleting file: ${path}.`)
    fs.unlinkSync(path);
  }
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

// if not 10m, pass it as an argument
saveGameData(process.argv[2] || 10000000);
