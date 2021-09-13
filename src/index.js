let Jimp = require('jimp');

async function collage(tmp) {
	let defs = {
		gap: 30,
		width: 1000,
		images: [],
		image: null,
		cols: 2
	}
	let opts = {};
	Object.assign(opts, defs, tmp);

	if (opts.image) {
		opts.images.push(image);
	}

	let rowsNumber = Math.ceil(opts.images.length / opts.cols);
	let rows = [];

	//making rows from images array
	for (let i = 0; i < rowsNumber; i++) {
		rows[i] = {};
		rows[i].images = [];

		for (let j = 0; j < opts.cols; j++) {
			if (opts.images.length)
				rows[i].images[j] = await Jimp.read(opts.images.shift());
		}

		//computing row hegiht
		let devisor = 0;
		rows[i].images.forEach(image => {
			devisor += (image.bitmap.width) / (image.bitmap.height);

		})
		// console.log(rows[i].images.length)
		rows[i].height = (opts.width - opts.gap * rows[i].images.length) / devisor;
	}

	//making canvas
	let heights = rows.map(row => row.height)
	let canvasHeight = heights.reduce((sum, height) => sum + height);

	let buffer = new Promise((res, rej) => {
		new Jimp(opts.width + opts.gap, canvasHeight + opts.gap * rows.length + opts.gap, (err, canvas) => {

			let heightOffset = opts.gap;

			rows.forEach((row, i) => {
				let lastRow = i == rows.length - 1;

				let widthOffset = opts.gap;

				row.images.forEach((image, j) => {
					image.resize(Jimp.AUTO, row.height)
					canvas.composite(image, widthOffset + opts.gap * j, heightOffset + opts.gap * i)
					widthOffset += image.bitmap.width
				})

				heightOffset += row.height;
			})
			canvas.getBuffer(Jimp.AUTO, (error, buffer) => {
				res(buffer);
			})

		})
	});

	return buffer;
}

module.exports = collage;