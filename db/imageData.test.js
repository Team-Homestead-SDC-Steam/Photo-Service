const pictures = require('./imageData.js');

test('pictures should be an array', () => {
  expect(Array.isArray(pictures.pictures)).toBe(true)
})

test('all pictures should have a unique url', () => {
  var count = 0
  var urlArray = []
  for (let i = 0; i < pictures.pictures.length; i++) {
    if (!urlArray.includes(pictures.pictures[i].url)) {
      urlArray.push(pictures.pictures[i].url)
    }
    count++
  }
  expect(urlArray.length).toEqual(count)
})