# Cartwheel's Collage Maker

A simple jimp-based single-function library to create collages looking like this:


<p><img width="500" src="./example/collage.png"></p>

## Installation

```sh
npm install cartwheee11/collage
```
## Simple Usage

```javascript
const collage = require("collage");
const fs = require('fs');

collage({
  images: [
    "./images/path/to/image.png",
    "https://website.com/image/from/web.jpg"
  ]
}).then(buffer => {
  //Getting a buffer and writing it into a file
  fs.writeFileSync('./collage.png', buffer);
});
```
It will cast collage with 2 columns and 500px width.

## Usage With Specific Properties

```javascript
const collage = require('collage');

collage({
  images: [
    "./images/path/to/image.png",
    "https://website.com/image/from/web.jpg"
  ],
  width: 1000,
  background: 0x555555FF,
  gap: 10,
  cols: 3,
  remainderToTop: false,
}).then(buffer => global.console.log)
```
The "remainderToTop" option receives `true` or `false` and determines behaviour of remainder of images located at the end of array that don't fit into a columns number. If it `false`, there extra images will be moved to new row not exceeding a strict number of columns. If it `true` (default value), the images will be crowded in current row

## License

MIT