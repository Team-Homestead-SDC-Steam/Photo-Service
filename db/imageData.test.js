const { pictures } = require('./imageData.js');


test('all pictures should have a unique url', () => {
  var count = 0
  var urlArray = []
  for (let i = 0; i < pictures.length; i++) {
    if (!urlArray.includes(pictures[i].public_id)) {
      urlArray.push(pictures[i].public_id)
    }
    count++
  }
  expect(urlArray.length).toEqual(count)
})

test('should have 800 photos in total', () => {
  expect(pictures.length).toEqual(800)
})

test('all images should be either jpg or png', () => {
  let result = true
  for (let i = 0; i < pictures.length; i++) {
    if (pictures[i].format !== 'jpg' && pictures[i].format !== 'png') {
      console.log ('found one! ', pictures[i].format)
      result = false
    }
  }
  expect(result).toBe(true)
})
