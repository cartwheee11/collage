const fs = require("fs");
const collage = require("../src/index");

const buffer = collage({
  images: [
    "./example/images/1.jpg",
    "./example/images/2.jpg",
    "./example/images/3.jpg",
    "./example/images/4.jpg",
    "./example/images/5.jpg",
  ],

  gap: 10,
});

buffer.then((currentBuffer) => {
	fs.writeFileSync("./example/collage.png", currentBuffer);
	global.console.log('the result was saved in ./examples/collage.png');
});
