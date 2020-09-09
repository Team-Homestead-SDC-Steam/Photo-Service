const fs = require('fs');
const {videos: videoArray} = require('./videoData.js')
const {pictures: photoArray} = require('./imageData.js');

const rnd = n => Array.isArray(n) ? n[rnd(n.length) - 1] : Math.floor(Math.random() * n) + 1;

const generateVideos = (count) => {
  let videoText = '';
  let randomVideo;
  for (let i=1; i<=count; i++) {
    randomVideo = rnd(videoArray);
    videoText += '{"mediaType":"video",';
    videoText += `"url":"https://www.youtube.com/embed/${randomVideo.id.videoId}",`;
    videoText += `"thumbnail":"${randomVideo.snippet.thumbnails.default.url}"}`;
    if(i!=count) videoText += ','; // add a comma to all but the last one
  }
  return videoText;
}

const generatePhotos = (count) => {
  let photoText = '';
  let randomPhoto;
  for (let i=1; i<=count; i++) { 
    randomPhoto = rnd(photoArray);
    photoText += '{"mediaType":"carouselPhoto",';
    photoText += '"url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/'
    photoText += `${randomPhoto.public_id}.${randomPhoto.format}"}`;
    if(i!=count) photoText += ',';  // add a comma to all but the last one
  }
  return photoText;
}

const generateGame = (id) => {
  let game = `{"id":${id}, "assets":[`;
  game += generateVideos(2) + ',';
  game += generatePhotos(6);
  return game += ']}' 
}

const saveGameData = (count, chunkSize = 10) => {
  let chunk = '';
  // fs.unlinkSync('./assets.dat') // delete file (if exists?)
  var ts = process.hrtime()
  let gameStream = fs.createWriteStream('./assets.dat')
  for (let i = 1; i <= count; i++) {
    chunk += `${generateGame(i)}\n`
    if (i % chunkSize === 0) {
      gameStream.write( chunk );
      chunk = '';
    }
    // gameStream.write( `${generateGame(i)}\n` );
  }

  gameStream.end(chunk)
  console.log('Time elapsed: ' + process.hrtime(ts)[1] / 1000000) 

}

saveGameData(2000000, 100);