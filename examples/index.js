const fs = require("fs");
const collage = require("../src/index");

const buffer = collage({
	images: [
		"./examples/images/1.jpg",
		"./examples/images/2.jpg",
		"./examples/images/3.jpg",
		"./examples/images/4.jpg",
	],
	cols: 3,
	gap: 10,
	background: 0xffffffff,
});

// console.log(buffer)
buffer.then((currentBuffer) => {
	fs.writeFileSync("./examples/collage.png", currentBuffer);
});
