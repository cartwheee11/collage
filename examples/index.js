
// import collage from '../examples/src/index.js'

let collage = require('../src/index.js');
let fs = require('fs');

let buffer = collage({
	images: [
		'./examples/images/1.jpg',
		'./examples/images/2.jpg',
		'./examples/images/3.jpg',
		'./examples/images/4.jpg',
	],
	cols: 3,
	gap: 10,
})

// console.log(buffer)
buffer.then(buffer => {
	fs.writeFileSync('./examples/collage.png', buffer);
})