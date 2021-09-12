

let Jimp = require('Jimp');

async function collage(tmp) {
	let defs= {
		gap: 30,
		width: 1000,
		images: [],
		image: null,
		cols: 2
	}
	let opts = {};
	Object.assign(opts, defs, tmp);

	if(opts.image) {
		opts.images.push(image);
	}

	let rowsNumber = Math.ceil(opts.images.length / opts.cols);
	let rows = [];


	//making rows from images array
	for(let i = 0; i < rowsNumber; i++) {
		rows[i] = {};
		rows[i].images = [];

		for(let j = 0; j < opts.cols; j++) {
			if(opts.images.length)
				rows[i].images[j] = await Jimp.read(opts.images.shift());
		}

		//computing row hegiht
		let devisor = 0;
		rows[i].images.forEach(image => {
			devisor += image.bitmap.width / image.bitmap.height;
		})
		
		rows[i].height = opts.width / devisor;
	}

	//making canvas
	let heights = rows.map(row => row.height )
	let canvasHeight = heights.reduce((sum, height) => sum + height);

	let buffer = new Promise((res, rej) => {
		new Jimp(opts.width, canvasHeight, (err, canvas) => {

			let heightOffset = 0;


			rows.forEach(row => {

				let widthOffset = 0;

				row.images.forEach(image => {
					image.resize(Jimp.AUTO, row.height)
					canvas.composite(image, widthOffset, heightOffset)

					widthOffset += image.bitmap.width
				})

				heightOffset += row.height;

			})

			// canvas.write('./copmosed.png')

			canvas.getBuffer(Jimp.AUTO, (error, buffer) => {
				res(buffer);
			})

		})
	});

	

	return buffer;
}

// let buffer = collage({
// 	images: [
// 		'./images/1.png',
// 		'./images/2.png',
// 		'./images/3.png',
// 		'./images/4.jpg',
// 		'./images/5.png',
// 		'./images/6.png',
// 		'./images/7.png',
// 	],
// })

// // console.log(buffer)
// buffer.then(console.log)

module.exports = collage;