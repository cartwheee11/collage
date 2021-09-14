const Jimp = require("jimp");

async function collage(options) {
  const defs = {
    gap: 30,
    width: 1000,
    images: [],
    image: null,
    cols: 2,
    background: 0xFFFFFFFF
  };
  const opts = {};
  Object.assign(opts, defs, options);

  if (opts.image) {
    opts.images.push(opts.image);
  }

  const rowsNumber = Math.ceil(opts.images.length / opts.cols);
  const rows = [];

  //  making rows from images array
  for (let i = 0; i < rowsNumber; i += 1) {
    rows[i] = {};
    rows[i].images = [];

    for (let j = 0; j < opts.cols; j += 1) {
      if (opts.images.length) {
        rows[i].images[j] = Jimp.read(opts.images.shift());
      }
    }

    rows[i].images = await Promise.all(rows[i].images);

    //  computing row hegiht
    let devisor = 0;
    rows[i].images.forEach((image) => {
      devisor += image.bitmap.width / image.bitmap.height;
    });

    rows[i].height = (opts.width - opts.gap * rows[i].images.length) / devisor;
  }

  //  making canvas
  const heights = rows.map((row) => row.height);
  const canvasHeight = heights.reduce((sum, height) => sum + height);

  const buffer = new Promise((res) => {
    const width = opts.width + opts.gap;
    const height = canvasHeight + opts.gap * rows.length + opts.gap;

    new Jimp(width, height, opts.background, (err, canvas) => {
      let heightOffset = opts.gap;

      rows.forEach((row, i) => {
        let widthOffset = opts.gap;

        row.images.forEach((image, j) => {
          image.resize(Jimp.AUTO, row.height);
          canvas.composite(
            image,
            widthOffset + opts.gap * j,
            heightOffset + opts.gap * i
          );
          widthOffset += image.bitmap.width;
        });

        heightOffset += row.height;
      });

      canvas.getBuffer(Jimp.AUTO, (error, currentBuffer) => {
        res(currentBuffer);
      });
    });
  });

  return buffer;
}

module.exports = collage

