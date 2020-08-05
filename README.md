# photo-carousel

This is a service I created individually but as part of a group project of recreating an entire Steam game page

## Demo:

![alt text](/carouselButtons.gif)

![alt text](/videoScroll.gif)

## Getting Started

```
git clone https://github.com/FEC-Bell/photo-carousel.git`
npm install
npm run seed
```

## Requirements

- Node JS v10 or later

## Endpoints

### `GET /api/media/:gameid`

Data shape:
```
{
  id: Number,
  mediaType: String,
  url: String,
  thumbnail: String
}

```