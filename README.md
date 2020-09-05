# Photo-Service

Independent implementation of the Steam item page photo carousel service.
When opened Returns 6 media items (video and images) for each game record.
React front end renders a web carousel displaying this media.

Note: this is designed to be displayed as a module on a larger item page:
https://github.com/Team-Homestead-SDC-Steam/Proxy-Server-Damien


## Table of Contents
  1. Requirements
  2. Usage
  3. Data Shape
  4. Endpoints
  5. Proxy Integration

## Requirements

- Node JS v10 or later
- Active Mongoose instance running (for seeding and server activity)

## Usage

From the photo-carousel directory:
- run `npm install` to install dependencies
- run `npm run seed` to create and populate the database (requires running instance of Mongoose w/root access)
- run `npm run server` to start the Express server (or `npm run server-dev` in development)
- run `npm run build` to build the React bundles (or `npm run react-dev` in development)
- run `npm test` to run unit tests
- run `npm lint` to run code style compliance tests

## Data Shape

Video data stored:
{
  "kind": "youtube#searchResult",
  "etag": "mDP3DRSTcr3NR8mE5xTV8m9jO_Q",
  "id": {
    "kind": "youtube#video",
    "videoId": "tICLju7uf_8"
  },
  "snippet": {
    "publishedAt": "2020-06-14T08:13:46Z",
    "channelId": "UCYIrWCvNN9_I92b3BZXcujw",
    "title": "New Game Trailers 2020 | Weekly #20",
    "description": "Hi everyone! in this video we'll see some of the latest game trailers. To check latest game prices globally and save money on games Visit: https://gamermint.com/ ...",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/tICLju7uf_8/default.jpg",
        "width": 120,
        "height": 90
      },
      "medium": {
        "url": "https://i.ytimg.com/vi/tICLju7uf_8/mqdefault.jpg",
        "width": 320,
        "height": 180
      },
      "high": {
        "url": "https://i.ytimg.com/vi/tICLju7uf_8/hqdefault.jpg",
        "width": 480,
        "height": 360
      }
    },
    "channelTitle": "GAMETRL",
    "liveBroadcastContent": "none",
    "publishTime": "2020-06-14T08:13:46Z"
  }
}

Image data stored:
{
  "public_id": "Mario-Kart-8-Deluxe-Review-Shot-03_qh0ykp",
  "version": 1593119972,
  "format": "jpg",
  "width": 1920,
  "height": 1080,
  "type": "upload",
  "created_at": "2020-06-25T21:19:32Z"
}


## Endpoints

### GET /api/media/:gameId

  Response example:

  ```
[{"_id":"5f46df9cbbf2989430babf01","id":66,"mediaType":"video","url":"https://www.youtube.com/embed/YApuEWtG30w","thumbnail":"https://i.ytimg.com/vi/YApuEWtG30w/default.jpg","__v":0},
{"_id":"5f46df9cbbf2989430babf02","id":67,"mediaType":"video","url":"https://www.youtube.com/embed/F74LLDhAhhI","thumbnail":"https://i.ytimg.com/vi/F74LLDhAhhI/default.jpg","__v":0},
{"_id":"5f46df9cbbf2989430bac04d","id":398,"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/image_cover.jpg_rrkv3x.jpg","__v":0},
{"_id":"5f46df9cbbf2989430bac04e","id":399,"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/image_cover.jpg_m3zvjq.jpg","__v":0},
{"_id":"5f46df9cbbf2989430bac04f","id":400,"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/388983-sid-meier-s-civilization-vi-windows-full-cover_mxxfe9.jpg","__v":0},{"_id":"5f46df9cbbf2989430bac050","id":401,"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/maxresdefault_m9bd3t.jpg","__v":0},
{"_id":"5f46df9cbbf2989430bac051","id":402,"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/RMCEB1_ckrpwj.png","__v":0},
{"_id":"5f46df9cbbf2989430bac052","id":403,"mediaType":"carouselPhoto","url":"https://res.cloudinary.com/dq3iywusm/image/upload/w_600,h_337/Annotation-2020-01-04-072756_tyk0zg.png","__v":0}]
  ```
Returns status code 200 indicating success or status code 500 in case of failure.


{
  id: Number,
  mediaType: String,
  url: String,
  thumbnail: String
}


### POST /api/reviewcount/:gameId/:date

  Post body:

```
    {
      positive: Number,
      negative: Number
    }
```

Returns status code 201 indicating success or status code 500 in case of failure.

### GET /api/reviewcount/:gameId/date

  Response example:

  ```
    {
        "id": 2,
        "gameid": 1,
        "date": "2020-08-20T07:00:00.000Z",
        "positive": 19,
        "negative": 7
    }
  ```
Returns status code 200 indicating success or status code 500 in case of failure.

### PUT /api/reviewcount/:gameId/:date

  PUT body:

  ```
  {
    positive: Number,
    negative: Number
  }
  ```
  Returns status code 204 indicating success, status code 500 in case of failure and 404 if gameid or date not found.

### DELETE /api/reviewcount/:gameId/:date

  Returns status code 204 indicating success, status code 500 in case of failure and 404 if gameid or date not found.

```

```

