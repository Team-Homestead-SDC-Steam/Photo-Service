var {db, getMedia, Game, createGame, readGame, updateGame, deleteGame} = require('./index.js');

const testCreateAssets = `{"assets":[{"mediaType":"video","url":"https://www.youtube.com/embed/YApuEWtG30w","thumbnail":"https://i.ytimg.com/vi/YApuEWtG30w/default.jpg"},
      {"mediaType":"video","url":"https://www.youtube.com/embed/F74LLDhAhhI","thumbnail":"https://i.ytimg.com/vi/F74LLDhAhhI/default.jpg"},
      {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/image_cover.jpg_rrkv3x.jpg"},
      {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/image_cover.jpg_m3zvjq.jpg"},
      {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/388983-sid-meier-s-civilization-vi-windows-full-cover_mxxfe9.jpg"},
      {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/maxresdefault_m9bd3t.jpg"},
      {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/RMCEB1_ckrpwj.png"},
      {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/Annotation-2020-01-04-072756_tyk0zg.png"}]}`

const testUpdateAssets = `{"assets":[{"mediaType":"video","url":"https://www.youtube.com/embed/0xkg-FPirZ4","thumbnail":"https://i.ytimg.com/vi/YApuEWtG30w/default.jpg"},
        {"mediaType":"video","url":"https://www.youtube.com/embed/oVfR6-_2eLQ","thumbnail":"https://i.ytimg.com/vi/F74LLDhAhhI/default.jpg"},
        {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/image_cover.jpg_rrkv3x.jpg"},
        {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/image_cover.jpg_m3zvjq.jpg"},
        {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/388983-sid-meier-s-civilization-vi-windows-full-cover_mxxfe9.jpg"},
        {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/maxresdefault_m9bd3t.jpg"},
        {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/RMCEB1_ckrpwj.png"},
        {"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/Annotation-2020-01-04-072756_tyk0zg.png"}]}`

test('deleteAllGames() deletes all the games', async () => {
  let response;
  try {
    response = await deleteAllGames()
    response = await readAllGames()
    expect(response.length).toBe(0);
  } catch(err) {
    expect(err).toBe(null);
  }
  
});



var testCRUD = async (id) => {
  try {
    var response;
    response = await readAllGames()
    console.log('initial contents of DB: ' + response.length, response)
    response = await deleteAllGames()
    console.log('deletion successful? ' + response)
    response = await readAllGames()
    console.log('DB contents after deletion: ' + response.length, response)
    response = await createGame(id, testCreateAssets)
    console.log('created Game: ' + id)
    response = await readAllGames()
    console.log('DB contents after creation: ' + response.length, JSON.stringify(response))
    response = await updateGame(id, testUpdateAssets)
    console.log('updated Game: ' + id)
    response = await readGame(id)
    console.log('DB contents after update: ' +  JSON.stringify(response))
    // response = await deleteGame(id)
    // console.log('deleted Game: ' + response.id)
    // response = await readAllGames()
    // console.log('DB contents after update: ' + response.length, response)

  } catch(err) {

    console.log('error: ' + err)

  }
}

// testCRUD(2);
