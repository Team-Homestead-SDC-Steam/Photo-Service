const mockDb = require('../db/seed.js');

test('all videos should have a unique url', () => {
  var count = 0
  var urlArray = []
  for (let i = 0; i < mockDb.mockDb.length; i++) {
    let videoUrl = mockDb.mockDb[i].url
    if (!urlArray.includes(videoUrl)) {
      urlArray.push(videoUrl)
    } else {
      console.log(videos[i].etag)
    }
    count++
  }
  expect(urlArray.length).toEqual(count)
})

test('all videos should be embeded', () => {
  var isEmbeded = true
  for (let i = 0; i < mockDb.mockDb.length; i++) {
    if (mockDb.mockDb[i].mediaType === 'video' && !mockDb.mockDb[i].url.includes('embed')) {
      isEmbeded = false
    }
  }
  expect(isEmbeded).toBe(true)
})