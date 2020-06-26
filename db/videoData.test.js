var { videos } = require('./videoData.js');

test('all videos should have a uniqe url', () => {
  var count = 0
  var urlArray = []
  for (let i = 0; i < videos.length; i++) {
    let videoUrl = videos[i].id.videoId
    if (!urlArray.includes(videoUrl)) {
      urlArray.push(videoUrl)
    } else {
      console.log(videos[i].etag)
    }
    count++
  }
  expect(urlArray.length).toEqual(count)
})