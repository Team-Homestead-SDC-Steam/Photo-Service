const mockDb = require('../db/seed.js');



test('all pictures should be unique', () => {
  var count = 0
  var urlArray = []
  for (let i = 0; i < mockDb.mockDb.length; i++) {
    if (!urlArray.includes(mockDb.mockDb[i].url)) {
      urlArray.push(mockDb.mockDb[i].url)
    }
    count++
  }
  console.log('mockDb length', mockDb.mockDb.length)
  expect(urlArray.length).toEqual(count)
})

test('should have 600 carousel pictures, 100 description pictures, and 100 thumbnail pictures', () => {
  var carouselArr = [];
  var desArr = [];
  var thumbnailArr = [];
  for (let i = 0; i < mockDb.mockDb.length; i++){
    if (mockDb.mockDb[i].mediaType === 'carouselPhoto') {
      carouselArr.push(mockDb.mockDb[i])
    }
    if (mockDb.mockDb[i].mediaType === 'descriptionPhoto') {
      desArr.push(mockDb.mockDb[i])
    }
    if (mockDb.mockDb[i].mediaType === 'thumbnail') {
      thumbnailArr.push(mockDb.mockDb[i])
    }
  }
  expect(carouselArr.length).toEqual(600)
  expect(desArr.length).toEqual(100)
  expect(thumbnailArr.length).toEqual(100)
})

test('all images should be either jpg or png', () => {
  let result = true
  for (let i = 0; i < mockDb.mockDb.length; i++) {
    if(mockDb.mockDb.mediaType !== 'video') {
      if (mockDb.mockDb[i].url.includes('jpg') && mockDb.mockDb[i].url.includes('png')) {
        result = false
      }
    }
  }
  expect(result).toBe(true)
})

test ('all images should be the right sizes', () => {
  let rightSizes = true;
  for (let i = 0; i < mockDb.mockDb.length; i++) {
    let media = mockDb.mockDb[i]
    if (media.mediaType === 'carouselPhoto' && !media.url.includes('w_600,h_337')) {
      rightSizes = false;
    }
    else if (media.mediaType === 'thumbnail' && !media.url.includes('w_184,h_69')) {
      rightSizes = false;
    }
    else if (media.mediaType === 'descriptionPhoto' && !media.url.includes('w_460,h_215')) {
      rightSizes = false;
    }
  }
  expect(rightSizes).toBe(true)
})